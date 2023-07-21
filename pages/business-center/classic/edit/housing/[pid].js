import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import HousingFormOne from "@/components/business-center/housing/HousingFormOne";
import HousingFormTwo from "@/components/business-center/housing/HousingFormTwo";
import HousingFormThree from "@/components/business-center/housing/HousingFormThree";
import HousingFormFour from "@/components/business-center/housing/HousingFormFour";
import { Alert, IconButton } from "@mui/material";

function EditHousingClassic({ pid }) {
  console.log(pid);
  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [housingType, setHousingType] = useState("Apartment");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [housingPostValues, setHousingPostValues] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [guestCount, setGuestCount] = useState(0);
  const [bedroomCount, setBedroomCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);
  const [amenities, setAmenities] = useState({
    kitchen: false,
    wifi: false,
    tv: false,
    washer: false,
    hairDryer: false,
    refridgerator: false,
    microwave: false,
    workspace: false,
    dryer: false,
    smokeAlarm: false,
    cookingBasics: false,
  });
  const [housingPrice, setHousingPrice] = useState({
    exactPrice: { price: "", interval: "week" },
    priceRange: { minPrice: "", maxPrice: "", interval: "week" },
  });
  const [priceOption, setPriceOption] = useState("exact");
  const [snackBar, setSnackBar] = useState({
    isSnackBarOpen: false,
    snackMessage: "",
  });

  const { isSnackBarOpen, snackMessage } = snackBar;
  const { title, description, location } = housingPostValues;
  const { exactPrice, priceRange } = housingPrice;

  const { back } = useRouter();

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
      setHousingPrice((prev) => ({
        exactPrice: { ...prev.exactPrice, [name]: value },
        priceRange: { minPrice: "", maxPrice: "", interval: "week" },
      }));
    }
    if (priceOption === "range") {
      console.log(name, value);
      setHousingPrice((prev) => ({
        exactPrice: { price: "", interval: "week" },
        priceRange: { ...prev.priceRange, [name]: value },
      }));
    }
  };

  const handleHousingValuesChange = (e) => {
    const { value, name } = e.target;
    setHousingPostValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleHousingTypeChange = (event) => {
    setHousingType(event.target.value);
  };

  const handleBack = () => {
    if (step === 1) {
      back();
    } else {
      setStep((prev) => (prev -= 1));
    }
  };

  const handleNext = () => {
    if (step === 1) {
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

      if (location === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Location required.",
        }));
        return;
      }
    }

    if (step === 2) {
      if (guestCount === 0) {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Number of guests required.",
        }));
        return;
      }

      if (bedroomCount === 0) {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Number of bedrooms required.",
        }));
        return;
      }
    }

    if (step === 3) {
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

    if (step === 4) {
      setIsPublish(true);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
  };

  const handlePhotoFileChange = (e) => {
    const selectedImage = e.target.files[0];
    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName };

    if (!uploadedPhotos.includes(imgData))
      setUploadedPhotos((prev) => [...prev, imgData]);
  };

  // Form Two
  const handleMinusCount = (arg) => () => {
    if (arg === "guestCount") {
      if (guestCount === 0) return;
      setGuestCount((prev) => (prev -= 1));
    }
    if (arg === "bedroomCount") {
      if (bedroomCount === 0) return;
      setBedroomCount((prev) => (prev -= 1));
    }
    if (arg === "parkingCount") {
      if (parkingCount === 0) return;
      setParkingCount((prev) => (prev -= 1));
    }
    if (arg === "bathroomCount") {
      if (bathroomCount === 0) return;
      setBathroomCount((prev) => (prev -= 1));
    }
  };

  const handlePlusCount = (arg) => () => {
    if (arg === "guestCount") {
      setGuestCount((prev) => (prev += 1));
    }
    if (arg === "bedroomCount") {
      setBedroomCount((prev) => (prev += 1));
    }
    if (arg === "parkingCount") {
      setParkingCount((prev) => (prev += 1));
    }
    if (arg === "bathroomCount") {
      setBathroomCount((prev) => (prev += 1));
    }
  };

  const handleAmenitiesChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const displayHousingPostForms = (step) => {
    if (step === 1)
      return (
        <HousingFormOne
          handlePhotoFileChange={handlePhotoFileChange}
          handleHousingTypeChange={handleHousingTypeChange}
          housingType={housingType}
          uploadedPhotos={uploadedPhotos}
          handleHousingValuesChange={handleHousingValuesChange}
          housingPostValues={housingPostValues}
        />
      );

    if (step === 2)
      return (
        <HousingFormTwo
          handleMinusCount={handleMinusCount}
          handlePlusCount={handlePlusCount}
          handleAmenitiesChange={handleAmenitiesChange}
          guestCount={guestCount}
          bedroomCount={bedroomCount}
          parkingCount={parkingCount}
          bathroomCount={bathroomCount}
          amenities={amenities}
        />
      );
    if (step === 3)
      return (
        <HousingFormThree
          housingPrice={housingPrice}
          handlePriceOption={handlePriceOption}
          priceOption={priceOption}
          handleChangePrice={handleChangePrice}
        />
      );
    if (step === 4)
      return (
        <HousingFormFour
          housingPostValues={housingPostValues}
          housingType={housingType}
          uploadedPhotos={uploadedPhotos}
          guestCount={guestCount}
          bedroomCount={bedroomCount}
          parkingCount={parkingCount}
          bathroomCount={bathroomCount}
          amenities={amenities}
          housingPrice={housingPrice}
          priceOption={priceOption}
          isPublish={isPublish}
          closeModal={closeModal}
        />
      );
  };

  const closeModal = () => {
    setIsPublish(false);
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
      <div className="pb-28">
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
        <div className="flex gap-4 p-4">
          <button className="rounded w-1/2 text-[color:var(--deals-primary-med)] border border-[color:var(--deals-primary-med)]">
            Save & Exit
          </button>
          <button
            onClick={handleNext}
            className="rounded w-1/2 text-white bg-[color:var(--secondary)] py-2"
          >
            {step === 4 ? "Publish" : "Next"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditHousingClassic;

EditHousingClassic.getLayout = function getLayout(page) {
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
