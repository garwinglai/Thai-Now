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
import { db } from "@/firebase/fireConfig";
import { doc, getDoc } from "firebase/firestore";
import { createGeoHash } from "@/firebase/fireConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Geocode from "react-geocode";
import { Timestamp } from "firebase/firestore";
import { getLocalStorage } from "@/utils/clientStorage";
import {
  publishDraftClassicMarketPost,
  saveMarketClassicDraft,
  updateMarketClassicDraft,
  updateMarketClassicPost,
} from "@/helper/client/marketplace";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

function EditMarketplaceClassic({ pid }) {
  const { authUser, loading } = useAuth();
  const { uid, email, displayName } = authUser || {};

  const [isDraft, setIsDraft] = useState(false);
  const [postId, setPostId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [marketPostType, setMarketPostType] = useState("Product");
  const [productDetails, setProductDetails] = useState({
    postTitle: "",
    postDescription: "",
    postAddress: "",
    productType: "Food",
    addy1: "",
    addy2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isProductPhysical, setIsProductPhysical] = useState("Yes");
  const [productCondition, setProductCondition] = useState("Used");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [removedPhotos, setRemovedPhotos] = useState([]);
  const [newAddedPhotos, setNewAddedPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);
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
  const [postData, setPostData] = useState({});

  const {
    postTitle,
    postDescription,
    postAddress,
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

  useEffect(() => {
    if (!uid) return;

    const fetchHousingPost = async () => {
      const postRef = doc(db, "users", uid, "marketPosts", pid);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        return;
      }

      const postData = postSnap.data();
      const postId = postSnap.id;

      const {
        postAddressDetails,
        postDescription,
        postTitle,
        price,
        photos,
        offerTypeDisplay,
      } = postData;

      const { addy1, addy2, city, state, zip } = postAddressDetails;
      const photoArr = [];

      for (const key in photos) {
        if (photos.hasOwnProperty(key)) {
          const imgUrl = photos[key];
          const fileName = key;
          const imgData = { imgUrl, fileName };
          photoArr.push(imgData);
        }
      }

      const exactPrice = price.slice(1);

      setPostId(postId);
      setOfferPrice((prev) => ({
        ...prev,
        exactPrice: { price: exactPrice, interval: "" },
      }));
      setUploadedPhotos(photoArr);
      setOldPhotos(photoArr);
      setPostData(postData);
      setProductDetails((prev) => ({
        ...prev,
        postTitle,
        postDescription,
        addy1,
        addy2,
        city,
        state,
        zip,
      }));

      setMarketPostType(offerTypeDisplay);
    };

    const fetchDrafts = async () => {
      const draftsRef = doc(db, "users", uid, "drafts", pid);
      const draftSnap = await getDoc(draftsRef);

      if (!draftSnap.exists()) {
        return;
      }

      const draftData = draftSnap.data();
      const postId = draftSnap.id;

      const {
        postAddressDetails,
        postDescription,
        postTitle,
        price,
        photos,
        offerTypeDisplay,
      } = draftData;

      const { addy1, addy2, city, state, zip } = postAddressDetails;
      const photoArr = [];

      for (const key in photos) {
        if (photos.hasOwnProperty(key)) {
          const imgUrl = photos[key];
          const fileName = key;
          const imgData = { imgUrl, fileName };
          photoArr.push(imgData);
        }
      }

      const exactPrice = price.slice(1);

      setIsDraft(true);
      setPostId(postId);
      setOfferPrice((prev) => ({
        ...prev,
        exactPrice: { price: exactPrice, interval: "" },
      }));
      setUploadedPhotos(photoArr);
      setOldPhotos(photoArr);
      setPostData(postData);
      setProductDetails((prev) => ({
        ...prev,
        postTitle,
        postDescription,
        addy1,
        addy2,
        city,
        state,
        zip,
      }));

      setMarketPostType(offerTypeDisplay);
    };

    fetchHousingPost();
    fetchDrafts();
  }, [uid, pid]);

  const handleBack = () => {
    if (step === 1) {
      back();
    } else {
      setStep((prev) => (prev -= 1));
    }
  };

  const handleNext = async () => {
    if (step === 2) {
      if (postTitle === "") {
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

      if (postDescription === "") {
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
      setIsLoading(true);
      await publishPost();
      setIsLoading(false);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const publishPost = async () => {
    const marketPostData = await structureMarketPostData();

    if (isDraft) {
      const { success, error, postId } = await publishDraftClassicMarketPost(
        marketPostData,
        uid
      );

      if (success) {
        setIsPublish(true);
        setPostId(postId);
      }
    } else {
      const { success, error, postId } = await updateMarketClassicPost(
        marketPostData,
        uid
      );
      console.log("success", success);
      console.log("error", error);

      if (success) {
        setIsPublish(true);
        setPostId(postId);
      }
    }

    // TODO: handle housing post error
  };

  const getLatLngFromAddress = (address) => {
    return Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        return { lat, lng };
      },
      (error) => {
        console.error(error);
        // return { error };
      }
    );
  };

  const structureMarketPostData = async () => {
    let postAddress = "";
    let lat = "";
    let lng = "";
    let geohash = "";

    if (addy1 !== "" && city !== "" && state !== "" && zip !== "") {
      postAddress = addy2
        ? addy1 + " " + addy2 + " " + city + " " + state + " " + zip
        : addy1 + " " + city + " " + state + " " + zip;
      try {
        const { lat: latitude, lng: longitude } = await getLatLngFromAddress(
          postAddress
        );
        lat = latitude;
        lng = longitude;
      } catch (error) {
        console.log("getAddylatlng", error);
      }
    }

    if (lat !== "" && lng !== "") {
      try {
        const geoHash = await createGeoHash(lat, lng);
        geohash = geoHash;
      } catch (error) {
        console.log("geohash", error);
      }
    }

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
    let includeTax = offerIncludesTax === "Yes" ? 0 : 1;

    const marketplaceData = {
      postId,
      postTitle,
      postDescription,
      createdAt: Timestamp.now(),
      postAddress,
      postAddressDetails: {
        addy1,
        addy2,
        city,
        state,
        zip,
      },
      geohash,
      postCoord: {
        lat,
        lng,
      },
      userId: uid,
      userName: displayName,
      posterType: 0,
      // standoutAmenities: [],
      offerType,
      offerTypeDisplay: marketPostType,
      productType: productTypeInt,
      productTypeDisplay: productType,
      physicalProduct,
      condition,
      conditionDisplay: productCondition,
      price: priceOption === "exact" && "$" + exactPrice.price,
      // pricePer,
      // pricePerDisplay, don't think i need these for marketplace /week,month, etc.
      includeTax,
      rating: 0,
      postType: 2,
      reviewNum: 0,
      newAddedPhotos: uploadedPhotos,
      oldPhotos,
      removedPhotos,
    };

    // TODO: add standout amenities?! should they have amenities... dont think so

    return marketplaceData;
  };

  const handleSaveAndExit = async () => {
    setIsLoading(true);
    const housingPostData = await structureMarketPostData();
    // 0: jobs 1:deals, 2:marketplace, 3:housing
    if (isDraft) {
      const { success, error } = await updateMarketClassicDraft(
        housingPostData,
        uid
      );

      if (success) {
        setIsLoading(false);
        push("/business-center/classic");
      }
    } else {
      const { success, error } = await saveMarketClassicDraft(
        housingPostData,
        uid
      );
      console.log("done", success, error);
      if (success) {
        push("/business-center/classic");
        setIsLoading(false);
      }
    }
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

    if (!selectedImage) return;

    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName, imageFile: selectedImage };

    if (!uploadedPhotos.includes(imgData)) {
      setUploadedPhotos((prev) => [...prev, imgData]);
      setNewAddedPhotos((prev) => [...prev, imgData]);
    }
  };

  const handleRemoveImage = (file, fileName) => () => {
    const { imgUrl } = file;
    const filteredPhotos = uploadedPhotos.filter(
      (photo) => photo.fileName != fileName
    );

    const existedFileToRemove = oldPhotos.find(
      (photo) => photo.fileName != fileName
    );
    setUploadedPhotos(filteredPhotos);
    setOldPhotos(filteredPhotos);

    if (existedFileToRemove) {
      setRemovedPhotos((prev) => [...prev, existedFileToRemove]);
    }
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
          handleRemoveImage={handleRemoveImage}
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
          authUser={authUser}
          postId={postId}
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
        <button
          onClick={handleBack}
          className="flex items-center gap-1 bg-transparent pl-4 pt-4"
        >
          <ChevronLeftIcon />
          <p className="text-[color:var(--deals-primary-med)] text-base">
            Back
          </p>
        </button>
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
        {isLoading ? (
          <div className="w-full p-4 flex justify-center items-center ">
            <CircularProgress color="warning" />
          </div>
        ) : (
          <div className="flex gap-4 p-4 lg:justify-between lg:px-16">
            <button
              onClick={handleSaveAndExit}
              className="rounded w-1/2 text-[color:var(--deals-primary-med)] border border-[color:var(--deals-primary-med)] lg:w-fit lg:px-4"
            >
              Save & Exit
            </button>
            <button
              onClick={handleNext}
              className="rounded w-1/2 text-white bg-[color:var(--secondary)] py-2 lg:w-fit lg:px-8"
            >
              {step === 5 ? "Publish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default EditMarketplaceClassic;

EditMarketplaceClassic.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};

export async function getServerSideProps(ctx) {
  console.log(ctx);
  const { pid } = ctx.query;
  console.log(pid);

  return {
    props: {
      pid,
    },
  };
}
