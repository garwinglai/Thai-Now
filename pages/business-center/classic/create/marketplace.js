import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import MarketFormOne from "@/components/business-center/marketplace/MarketFormOne";
import MarketFormTwo from "@/components/business-center/marketplace/MarketFormTwo";
import MarketFormThree from "@/components/business-center/marketplace/MarketFormThree";
import MarketFormFour from "@/components/business-center/marketplace/MarketFormFour";
import MarketFormFive from "@/components/business-center/marketplace/MarketFormFive";
import Snackbar from "@mui/material/Snackbar";
import { Alert, IconButton } from "@mui/material";
import { useAuth } from "@/components/auth/AuthProvider";
import { Timestamp } from "firebase/firestore";

function MarketPlacePost() {
  const { authUser, loading } = useAuth();
  const { uid, email, displayName } = authUser || {};

  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [marketPostType, setMarketPostType] = useState("Product");
  const [productDetails, setProductDetails] = useState({
    title: "",
    productType: "Food",
    description: "",
    location: "",
    addy1: "",
    addy2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isProductPhysical, setIsProductPhysical] = useState("Yes");
  const [productCondition, setProductCondition] = useState("Used");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [priceOption, setPriceOption] = useState("exact");
  const [offerPrice, setOfferPrice] = useState({
    exactPrice: { price: "", interval: "week" },
    priceRange: { minPrice: "", maxPrice: "", interval: "week" },
  });
  const [offerIncludesTax, setOfferIncludesTax] = useState("Yes");
  const [snackBar, setSnackBar] = useState({
    isSnackBarOpen: false,
    snackMessage: "",
  });

  const {
    title,
    description,
    location,
    productType,
    addy1,
    addy2,
    city,
    state,
    zip,
  } = productDetails;
  const { isSnackBarOpen, snackMessage } = snackBar;
  const { exactPrice, priceRange } = offerPrice;

  const { back, push } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  const handleBack = () => {
    if (step === 1) {
      back();
    } else {
      setStep((prev) => (prev -= 1));
    }
  };

  const handleNext = () => {
    if (step === 2) {
      if (title === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing title.",
        }));
        return;
      }

      if (uploadedPhotos.length === 0) {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Photos required.",
        }));
        return;
      }

      if (description === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing description.",
        }));
        return;
      }

      if (addy1 === "" || city === "" || state === "" || zip === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Location required.",
        }));
        return;
      }
    }

    if (step === 4) {
      if (priceOption === "exact") {
        if (exactPrice.price === "") {
          setSnackBar((prev) => ({
            isSnackBarOpen: true,
            snackMessage: "Please enter a price.",
          }));
          return;
        }
      }
      if (priceOption === "range") {
        if (priceRange.minPrice === "" || priceRange.maxPrice === "") {
          setSnackBar((prev) => ({
            isSnackBarOpen: true,
            snackMessage: "Please enter a price range.",
          }));
          return;
        }
      }
    }

    if (step === 5) {
      publishPost();
      // setIsPublish(true);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const publishPost = async () => {
    const housingPostData = structureHousingPostData();
    // const { success, error } = await createHousingClassic(housingPostData, uid);

    if (success) {
      setIsPublish(true);
    }
    // TODO: handle housing post error
  };

  const structureHousingPostData = () => {
    const postAddress =
      addy1 + " " + addy2 + " " + city + " " + state + " " + zip;

    let offerType = marketPostType === "Product" ? 0 : 1;

    // 0 = Food
    let productTypeInt = 0;

    switch (productType) {
      case "Handmade":
        break;
      case "Vehicles":
        productTypeInt = 1;
        break;
      case "Home & Garden":
        productTypeInt = 2;
        break;
      case "Freelance":
        productTypeInt = 3;
        break;
      case "Handyman":
        productTypeInt = 4;
        break;
      case "Taxi":
        productTypeInt = 5;
        break;
      case "Other":
        productTypeInt = 6;
        break;
      default:
        break;
    }

    let physicalProduct = isProductPhysical === "Yes" ? 1 : 0;
    let condition = productCondition === "Used" ? 0 : 1;

    // instantiate 0 = day
    let pricePer = 0;
    let pricePerDisplay = "per Day";

    switch (exactPrice.interval) {
      case "week":
        pricePer = 1;
        break;
      case "month":
        pricePer = 2;
        break;
      case "year":
        pricePer = 3;
      default:
        break;
    }

    switch (pricePer) {
      case 1:
        pricePerDisplay = "per Week";
        break;
      case 2:
        pricePerDisplay = "per Month";
        break;
      case 3:
        pricePerDisplay = "per Year";
      default:
        break;
    }

    let includeTax = offerIncludesTax === "Yes" ? 1 : 0;

    const marketplaceData = {
      postTitle: title,
      postDescription: description,
      createdAt: Timestamp.now(),
      postAddress,
      postAddressDetails: {
        addy1,
        addy2,
        city,
        state,
        zip,
      },
      // geoHash: "",
      // postCoord: {
      //   lat: 0,
      //   lng: 0,
      // },
      userId: uid,
      userName: displayName,
      poserType: 0,
      // photos: uploadedPhotos,
      offerType,
      offerTypeDisplay: marketPostType,
      productType: productTypeInt,
      productTypeDisplay: productType,
      physicalProduct,
      condition,
      conditionDisplay: productCondition,
      price: priceOption === "exact" && "$" + exactPrice.price,
      pricePer,
      pricePerDisplay,
      includeTax,
    };

    // TODO: add standout amenities

    return marketplaceData;
  };

  const closeModal = () => {
    setIsPublish(false);
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
  };

  const handleChangeMarketPostType = (e) => {
    setMarketPostType(e.target.value);
  };

  const handleProductPhysicalChange = (e) => {
    setIsProductPhysical(e.target.value);
  };

  const handleProductCondition = (e) => {
    setProductCondition(e.target.value);
  };

  const handleProductValueChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaxChange = (e) => {
    setOfferIncludesTax(e.target.value);
  };

  const handlePriceOption = (e) => {
    const { value } = e.target;
    console.log(value);
    setPriceOption(value);
  };

  const handleChangePrice = (e) => {
    const { name, value } = e.target;
    console.log(priceOption);
    if (priceOption === "exact") {
      console.log("hi");
      setOfferPrice((prev) => ({
        exactPrice: { ...prev.exactPrice, [name]: value },
        priceRange: { minPrice: "", maxPrice: "", interval: "week" },
      }));
    }
    if (priceOption === "range") {
      console.log(name, value);
      setOfferPrice((prev) => ({
        exactPrice: { price: "", interval: "week" },
        priceRange: { ...prev.priceRange, [name]: value },
      }));
    }
  };

  const handlePhotoFileChange = (e) => {
    const selectedImage = e.target.files[0];
    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName };

    if (!uploadedPhotos.includes(imgData))
      setUploadedPhotos((prev) => [...prev, imgData]);
  };

  const displayHousingPostForms = (step) => {
    if (step === 1)
      return (
        <MarketFormOne
          marketPostType={marketPostType}
          handleChangeMarketPostType={handleChangeMarketPostType}
        />
      );
    if (step === 2)
      return (
        <MarketFormTwo
          productDetails={productDetails}
          handleProductValueChange={handleProductValueChange}
          uploadedPhotos={uploadedPhotos}
          handlePhotoFileChange={handlePhotoFileChange}
        />
      );
    if (step === 3)
      return (
        <MarketFormThree
          isProductPhysical={isProductPhysical}
          productCondition={productCondition}
          handleProductCondition={handleProductCondition}
          handleProductPhysicalChange={handleProductPhysicalChange}
        />
      );
    if (step === 4)
      return (
        <MarketFormFour
          handlePriceOption={handlePriceOption}
          priceOption={priceOption}
          handleTaxChange={handleTaxChange}
          offerIncludesTax={offerIncludesTax}
          handleChangePrice={handleChangePrice}
          offerPrice={offerPrice}
        />
      );
    if (step === 5)
      return (
        <MarketFormFive
          marketPostType={marketPostType}
          productDetails={productDetails}
          isProductPhysical={isProductPhysical}
          productCondition={productCondition}
          uploadedPhotos={uploadedPhotos}
          priceOption={priceOption}
          offerPrice={offerPrice}
          offerIncludesTax={offerIncludesTax}
          isPublish={isPublish}
          closeModal={closeModal}
        />
      );
  };

  return (
    <React.Fragment>
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="error"
          sx={{ width: "100%", marginBottom: "5rem" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
      <div className="pb-28 lg:pt-20">
        <div className="flex items-center gap-1 pl-4 pt-4 lg:gap-2 lg:pt-8 lg:pl-16">
          <div className="lg:border lg:rounded-full">
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <button
            onClick={handleBack}
            className="text-[color:var(--deals-primary)]"
          >
            Back
          </button>
        </div>
        {displayHousingPostForms(step)}
      </div>
      <div className="fixed bottom-0 w-full bg-white ">
        <div className="flex gap-1">
          <span
            className={`flex-grow h-1 ${
              step >= 1 ? "bg-[color:var(--secondary)]" : "bg-gray-100 "
            }`}
          ></span>
          <span
            className={`flex-grow h-1  ${
              step >= 2 ? "bg-[color:var(--secondary)]" : "bg-gray-100 "
            }`}
          ></span>
          <span
            className={`flex-grow h-1  ${
              step >= 3
                ? "bg-[color:var(--gradient-secondary)]"
                : "bg-gray-100 "
            }`}
          ></span>
          <span
            className={`flex-grow h-1  ${
              step >= 4
                ? "bg-[color:var(--gradient-secondary)]"
                : "bg-gray-100 "
            }`}
          ></span>
          <span
            className={`flex-grow h-1  ${
              step >= 5
                ? "bg-[color:var(--gradient-secondary)]"
                : "bg-gray-100 "
            }`}
          ></span>
        </div>
        <div className="flex gap-4 p-4 lg:justify-between lg:px-16">
          <button className="rounded w-1/2 text-[color:var(--deals-primary-med)] border border-[color:var(--deals-primary-med)] lg:w-fit lg:px-4">
            Save & Exit
          </button>
          <button
            onClick={handleNext}
            className="rounded w-1/2 text-white bg-[color:var(--secondary)] py-2 lg:w-fit lg:px-8"
          >
            {step === 5 ? "Publish" : "Next"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MarketPlacePost;

MarketPlacePost.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};
