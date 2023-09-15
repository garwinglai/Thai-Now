import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import HousingFormOne from "@/components/business-center/housing/HousingFormOne";
import HousingFormTwo from "@/components/business-center/housing/HousingFormTwo";
import HousingFormThree from "@/components/business-center/housing/HousingFormThree";
import HousingFormFour from "@/components/business-center/housing/HousingFormFour";
import { Alert } from "@mui/material";
import { db } from "@/firebase/fireConfig";
import { doc, getDoc } from "firebase/firestore";
import { createGeoHash } from "@/firebase/fireConfig";
import CircularProgress from "@mui/material/CircularProgress";
import Geocode from "react-geocode";
import { Timestamp } from "firebase/firestore";
import {
  publishDraftClassicHousingPost,
  saveHousingClassicDraft,
  updateHousingClassicDraft,
  updateHousingClassicPost,
} from "@/helper/client/housing";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

function EditHousingClassic() {
  const { authUser, loading } = useAuth();
  const { uid, email, displayName } = authUser || {};

  const [isDraft, setIsDraft] = useState(false);
  const [postId, setPostId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [housingType, setHousingType] = useState("Apartment");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [removedPhotos, setRemovedPhotos] = useState([]);
  const [newAddedPhotos, setNewAddedPhotos] = useState([]);
  const [oldPhotos, setOldPhotos] = useState([]);
  const [housingPostValues, setHousingPostValues] = useState({
    postTitle: "",
    postDescription: "",
    postAddress: "",
    addy1: "",
    addy2: "",
    city: "",
    state: "",
    zip: "",
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
  const [postData, setPostData] = useState({});

  const { isSnackBarOpen, snackMessage } = snackBar;
  const { postTitle, postDescription, addy1, addy2, city, state, zip } =
    housingPostValues;
  const { exactPrice, priceRange } = housingPrice;

  const { back, push, query } = useRouter();
  const { pid } = query;

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  useEffect(() => {
    if (!uid) return;

    const fetchHousingPost = async () => {
      const postRef = doc(db, "users", uid, "housingPosts", pid);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        return;
      }

      const postData = postSnap.data();
      const postId = postSnap.id;

      const {
        amenitiesDisplay,
        bathroomNum,
        bedroomNum,
        guestNum,
        parkingNum,
        postAddressDetails,
        postCoord,
        postDescription,
        propertyTypeDisplay,
        postTitle,
        price,
        pricePer,
        geohash,
        photos,
      } = postData;

      const { addy1, addy2, city, state, zip } = postAddressDetails;
      const amenitiesArr = amenitiesDisplay.split(",");
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
      const exactPriceInterval =
        pricePer === 0
          ? "day"
          : pricePer === 1
          ? "week"
          : pricePer === 2
          ? "month"
          : "year";

      setPostId(postId);
      setHousingPrice((prev) => ({
        ...prev,
        exactPrice: { price: exactPrice, interval: exactPriceInterval },
      }));
      setUploadedPhotos(photoArr);
      setOldPhotos(photoArr);
      setPostData(postData);
      setHousingPostValues((prev) => ({
        ...prev,
        postTitle,
        postDescription,
        addy1,
        addy2,
        city,
        state,
        zip,
      }));

      setHousingType(propertyTypeDisplay);
      setGuestCount(guestNum);
      setBedroomCount(bedroomNum);
      setParkingCount(parkingNum);
      setBathroomCount(bathroomNum);

      setAmenities((prev) => ({
        ...prev,
        kitchen: amenitiesArr.includes("kitchen"),
        wifi: amenitiesArr.includes("wifi"),
        tv: amenitiesArr.includes("tv"),
        washer: amenitiesArr.includes("washer"),
        hairDryer: amenitiesArr.includes("hair dryer"),
        refridgerator: amenitiesArr.includes("refridgerator"),
        microwave: amenitiesArr.includes("microwave"),
        workspace: amenitiesArr.includes("workspace"),
        dryer: amenitiesArr.includes("dryer"),
        smokeAlarm: amenitiesArr.includes("smoke alarm"),
        cookingBasics: amenitiesArr.includes("cooking basics"),
      }));
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
        amenitiesDisplay,
        bathroomNum,
        bedroomNum,
        guestNum,
        parkingNum,
        postAddressDetails,
        postCoord,
        postDescription,
        propertyTypeDisplay,
        postTitle,
        price,
        pricePer,
        geohash,
        photos,
      } = draftData;

      const { addy1, addy2, city, state, zip } = postAddressDetails;
      const amenitiesArr = amenitiesDisplay.split(",");
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
      const exactPriceInterval =
        pricePer === 0
          ? "day"
          : pricePer === 1
          ? "week"
          : pricePer === 2
          ? "month"
          : "year";

      setIsDraft(true);
      setPostId(postId);
      setHousingPrice((prev) => ({
        ...prev,
        exactPrice: { price: exactPrice, interval: exactPriceInterval },
      }));
      setUploadedPhotos(photoArr);
      setOldPhotos(photoArr);
      setPostData(postData);
      setHousingPostValues((prev) => ({
        ...prev,
        postTitle,
        postDescription,
        addy1,
        addy2,
        city,
        state,
        zip,
      }));

      setHousingType(propertyTypeDisplay);
      setGuestCount(guestNum);
      setBedroomCount(bedroomNum);
      setParkingCount(parkingNum);
      setBathroomCount(bathroomNum);

      setAmenities((prev) => ({
        ...prev,
        kitchen: amenitiesArr.includes("kitchen"),
        wifi: amenitiesArr.includes("wifi"),
        tv: amenitiesArr.includes("tv"),
        washer: amenitiesArr.includes("washer"),
        hairDryer: amenitiesArr.includes("hair dryer"),
        refridgerator: amenitiesArr.includes("refridgerator"),
        microwave: amenitiesArr.includes("microwave"),
        workspace: amenitiesArr.includes("workspace"),
        dryer: amenitiesArr.includes("dryer"),
        smokeAlarm: amenitiesArr.includes("smoke alarm"),
        cookingBasics: amenitiesArr.includes("cooking basics"),
      }));
    };

    fetchHousingPost();
    fetchDrafts();
  }, [uid, pid]);

  const handlePriceOption = (e) => {
    const { value } = e.target;
    setPriceOption(value);
  };

  const handleChangePrice = (e) => {
    const { name, value } = e.target;

    if (priceOption === "exact") {
      setHousingPrice((prev) => ({
        exactPrice: { ...prev.exactPrice, [name]: value },
        priceRange: { minPrice: "", maxPrice: "", interval: "week" },
      }));
    }
    if (priceOption === "range") {
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

  const handleNext = async () => {
    if (step === 1) {
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
          snackMessage: "Address required.",
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
      setIsLoading(true);
      await publishPost();
      setIsLoading(false);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const publishPost = async () => {
    const housingPostData = await structureHousingPostData();

    if (isDraft) {
      // console.log("housingPostData", housingPostData);
      // return;
      const { success, error, postId } = await publishDraftClassicHousingPost(
        housingPostData,
        uid
      );

      if (success) {
        setIsPublish(true);
        setPostId(postId);
      }
    } else {
      const { success, error, postId } = await updateHousingClassicPost(
        housingPostData,
        uid
      );

      if (success) {
        setIsPublish(true);
        setPostId(postId);
      }
      // TODO: handle housing post error
    }
  };

  const structureHousingPostData = async () => {
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

    // instantiate 0 = apartment
    let propertyType = 0;
    let propertyTypeDisplay = "Apartment";

    switch (housingType) {
      case "Room":
        propertyType = 1;
        break;
      case "Condo":
        propertyType = 2;
        break;
      case "House":
        propertyType = 3;
        break;
      case "Other":
        propertyType = 4;
        break;
      default:
        break;
    }

    switch (propertyType) {
      case 1:
        propertyTypeDisplay = "Room";
        break;
      case 2:
        propertyTypeDisplay = "Condo";
        break;
      case 3:
        propertyTypeDisplay = "House";
        break;
      case 4:
        propertyTypeDisplay = "Other";
        break;
      default:
        break;
    }

    let amenitiesDisplay = "";
    const amenitiesIntArr = [];
    let i = 0;
    let j = 0; //amenitiesIntArr index

    for (const [key, value] of Object.entries(amenities)) {
      if (value) {
        if (i === 0) {
          amenitiesDisplay = key;
        } else {
          if (key === "hairDryer") {
            amenitiesDisplay = amenitiesDisplay.concat(", " + "hair dryer");
          } else if (key === "smokeAlarm") {
            amenitiesDisplay = amenitiesDisplay.concat(", " + "smoke alarm");
          } else if (key === "cookingBasics") {
            amenitiesDisplay = amenitiesDisplay.concat(", " + "cooking basics");
          } else {
            amenitiesDisplay = amenitiesDisplay.concat(", " + key);
          }
        }
        amenitiesIntArr.push(j);
        i++;
      }
      j++;
    }

    i = 0;

    const housingData = {
      postId,
      createdAt: Timestamp.now(),
      postTitle,
      postDescription,
      postAddress,
      postAddressDetails: {
        addy1,
        addy2,
        city,
        state,
        zip,
      },
      userId: uid,
      userName: displayName,
      // userProfilePic: "",
      posterType: 0,
      geohash,
      postCoord: {
        lat,
        lng,
      },
      price: priceOption === "exact" && "$" + exactPrice.price,
      pricePer,
      pricePerDisplay,
      propertyType,
      propertyTypeDisplay,
      guestNum: guestCount,
      bedroomNum: bedroomCount,
      parkingNum: parkingCount,
      bathroomNum: bathroomCount,
      amenities: amenitiesIntArr,
      amenitiesDisplay,
      rating: 0,
      reviewNum: 0,
      removedPhotos,
      newAddedPhotos,
      oldPhotos,
      postType: 3, // 0: jobs 1:deals, 2:marketplace, 3:housing
    };

    return housingData;
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

  const handleSaveAndExit = async () => {
    setIsLoading(true);
    const housingPostData = await structureHousingPostData();

    // 0: jobs 1:deals, 2:marketplace, 3:housing

    if (isDraft) {
      const { success, error } = await updateHousingClassicDraft(
        housingPostData,
        uid
      );
      console.log("done", success, error);

      if (success) {
        setIsLoading(false);
        push("/business-center/classic");
      }
    } else {
      const { success, error } = await saveHousingClassicDraft(
        housingPostData,
        uid
      );
      console.log("done", success, error);

      if (success) {
        setIsLoading(false);
        push("/business-center/classic");
      }
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
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

  const handleRemoveImage = (file) => () => {
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
          handleRemoveImage={handleRemoveImage}
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
          authUser={authUser}
          postId={postId}
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
              {step === 4 ? "Publish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default EditHousingClassic;

EditHousingClassic.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};
