import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/create-business/index.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import RadioCategory from "@/components/profile/create-business/RadioCategory";
import { useRouter } from "next/router";
import { CircularProgress, TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Alert, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "@/components/auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import { createGeoHash } from "@/firebase/fireConfig";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

// TODO: get data to prefill business name and email

function CreateBusiness() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [step, setStep] = useState(1);
  const [businessCategory, setBusinessCategory] = useState("Restaurant");
  const [businessValues, setBusinessValues] = useState({
    bizName: "",
    email: "",
    phoneNumber: "",
    website: "",
    about: "",
  });
  const [addressValues, setAddressValues] = useState({
    addy1: "",
    addy2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [snackBar, setSnackBar] = useState({
    isSnackBarOpen: false,
    snackMessage: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { bizName, email, phoneNumber, website, about } = businessValues;
  const { addy1, addy2, city, state, zip } = addressValues;
  const { isSnackBarOpen, snackMessage } = snackBar;

  const { push, back } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  const handleNext = async () => {
    if (step === 2) {
      if (bizName === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing business name.",
        }));
        return;
      }
      if (email === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing email.",
        }));
        return;
      }
      if (phoneNumber === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing phone number.",
        }));
        return;
      }

      const { success, error } = await createBiz();

      if (success) {
        push("/profile/business");
      }

      if (error) {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Error creating business.",
        }));
      }

      return;
    }

    setStep((prev) => prev + 1);
  };

  const createBiz = async () => {
    setIsLoading(true);

    const categoryIndex =
      businessCategory === "Restaurant"
        ? 0
        : businessCategory === "Massage/Spa"
        ? 1
        : businessCategory === "Beauty"
        ? 2
        : businessCategory === "Insurance"
        ? 3
        : businessCategory === "Auto Services"
        ? 4
        : businessCategory === "Travel"
        ? 5
        : businessCategory === "Retail"
        ? 6
        : businessCategory === "Market"
        ? 7
        : businessCategory === "Factory"
        ? 8
        : businessCategory === "Financial"
        ? 9
        : 10;

    let fullAddress = "";
    let geohash = "";
    let lat = "";
    let lng = "";

    if (addy1 !== "" && city !== "" && state !== "" && zip !== "") {
      fullAddress =
        addy2 === ""
          ? addy1 + " " + addy2 + " " + city + " " + state + " " + zip
          : addy1 + " " + city + " " + state + " " + zip;
      try {
        const { lat: latitude, lng: longitude } = await getLatLngFromAddress(
          fullAddress
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

    const bizData = {
      createdAt: Timestamp.now(),
      isApproved: true,
      numHousing: 0,
      numDeals: 0,
      numJobs: 0,
      numMarket: 0,
      rating: 0,
      reviewNum: 0,
      phoneNum: phoneNumber,
      name: bizName,
      email,
      website,
      categoryDisplay: businessCategory,
      categoryIndex,
      bizAboutUs: about,
      fullAddress,
      addressDetails: {
        addy1,
        addy2,
        city,
        state,
        zip,
      },
      geohash,
      addyCoord: {
        lat,
        lng,
      },
    };

    try {
      const userRef = doc(db, "users", uid);
      const bizRef = doc(collection(db, "users", uid, "biz"));
      const bizRefId = bizRef.id;
      const allBizRef = doc(db, "allBiz", bizRefId);

      const batch = writeBatch(db);

      batch.update(userRef, {
        usingBizId: bizRefId,
      });
      batch.set(bizRef, bizData);
      batch.set(allBizRef, bizData);

      await batch.commit();

      return { success: true };
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      return { success: false, error };
    }
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

  const handleBack = () => {
    if (step === 1) {
      back();
    }

    if (step === 2) {
      setStep((prev) => prev - 1);
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
  };

  const handleBusinessCategoryChange = (e) => {
    setBusinessCategory(e.target.value);
  };

  const handleChangeBizValues = (e) => {
    const { name, value } = e.target;
    setBusinessValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setAddressValues((prev) => ({ ...prev, [name]: value }));
  };

  function BusinessCategories(handleBusinessCategoryChange, businessCategory) {
    return (
      <FormControl sx={{ width: "100%" }}>
        <RadioGroup
          aria-labelledby="form-control-label-placement"
          name="position"
          defaultValue="top"
          value={businessCategory}
          onChange={handleBusinessCategoryChange}
        >
          {categories.map((category) => (
            <RadioCategory category={category} key={category} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  function BusinessDetails() {
    return (
      <form className="flex flex-col gap-4 pb-20">
        <div>
          <label
            htmlFor="business-name"
            className="text-[color:var(--deals-primary)]"
          >
            Business Name{" "}
            <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            type="text"
            name="bizName"
            id="bizName"
            value={bizName}
            onChange={handleChangeBizValues}
            className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
          />
        </div>
        <div>
          <label htmlFor="email" className="text-[color:var(--deals-primary)]">
            Email <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeBizValues}
            className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
          />
        </div>
        <div>
          <label
            htmlFor="phone-number"
            className="text-[color:var(--deals-primary)]"
          >
            Phone Number{" "}
            <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChangeBizValues}
            className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="text-[color:var(--deals-primary)]"
          >
            Business Address
            {/* <span className="text-[color:var(--secondary)] ">* </span> */}
          </label>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="addy1"
              id="addy1"
              placeholder="line 1"
              value={addy1}
              onChange={handleChangeAddress}
              className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 placeholder:font-extralight placeholder:text-sm"
            />
            <input
              type="text"
              name="addy2"
              id="addy2"
              placeholder="line 2"
              value={addy2}
              onChange={handleChangeAddress}
              className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 placeholder:font-extralight placeholder:text-sm"
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                value={city}
                onChange={handleChangeAddress}
                className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 placeholder:font-extralight placeholder:text-sm"
              />
              <input
                type="text"
                name="state"
                id="state"
                placeholder="state"
                maxLength={2}
                value={state}
                onChange={handleChangeAddress}
                className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 placeholder:font-extralight placeholder:text-sm"
              />
              <input
                type="number"
                name="zip"
                id="zip"
                placeholder="zip"
                value={zip}
                onChange={handleChangeAddress}
                className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 placeholder:font-extralight placeholder:text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="website"
            className="text-[color:var(--deals-primary)]"
          >
            Website
            <span className="ml-1 font-extralight text-sm">{` (Optional)`}</span>
          </label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={handleChangeBizValues}
            className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
          />
        </div>
        <div>
          <label htmlFor="about" className="text-[color:var(--deals-primary)]">
            About your business
            <span className="ml-1 font-extralight text-sm">{` (Optional)`}</span>
          </label>
          <textarea
            value={about}
            onChange={handleChangeBizValues}
            name="about"
            id="about"
            rows="5"
            className="border-none w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
          />
          <p className="font-light text-[color:var(--label-color)] text-sm">
            {about.length}/500
          </p>
        </div>
      </form>
    );
  }

  return (
    <div className="pb-20">
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
      <div className="p-4 lg:pt-20">
        <div className="flex items-center gap-1 lg:gap-2 lg:pt-8 lg:pl-16">
          <div className="lg:border  lg:rounded-full">
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
      </div>
      <div className="px-4 lg:w-2/5 lg:mx-auto">
        <h3 className="mb-4">
          {step === 1
            ? "What is the catogry of your business?"
            : "Tell us about your Business"}
        </h3>

        {step === 1 && (
          <div className="">
            {BusinessCategories(handleBusinessCategoryChange, businessCategory)}
          </div>
        )}
        {step === 2 && BusinessDetails()}
      </div>
      <div className="fixed bottom-0 w-full p-4 border-t bg-white lg:text-center ">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress color="warning" />
          </div>
        ) : (
          <button
            className="w-full bg-[color:var(--secondary)] text-white rounded-md p-3 lg:w-2/5"
            onClick={handleNext}
          >
            {step === 1 ? "Next" : "Create your Business"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateBusiness;

CreateBusiness.getLayout = function getLayout(page) {
  return <MainLayout route="create-business">{page}</MainLayout>;
};

const categories = [
  "Restaurant",
  "Massage/Spa",
  "Beauty",
  "Insurance",
  "Auto Services",
  "Travel",
  "Retail",
  "Market",
  "Factory",
  "Financial",
  "Other",
];
