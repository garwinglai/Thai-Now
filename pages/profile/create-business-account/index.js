import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import styles from "@/styles/pages/profile/create-business/index.module.css";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import RadioCategory from "@/components/profile/create-business/RadioCategory";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Alert, IconButton } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useAuth } from "@/components/auth/AuthProvider";

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
    address: "",
    website: "",
    about: "",
  });
  const [snackBar, setSnackBar] = useState({
    isSnackBarOpen: false,
    snackMessage: "",
  });

  const { bizName, email, phoneNumber, address, website, about } =
    businessValues;
  const { isSnackBarOpen, snackMessage } = snackBar;

  const { push, back } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  const handleNext = () => {
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

      // TODO: create business, then nav to business profile
      push("/profile/business");
      return;
    }
    setStep((prev) => prev + 1);
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
    const { name, values } = e.target;
    setBusinessValues((prev) => ({ ...prev, [name]: values }));
  };

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
        {step === 2 && BusinessDetails(handleChangeBizValues, businessValues)}
      </div>
      <div className="fixed bottom-0 w-full p-4 border-t bg-white lg:text-center ">
        <button
          className="w-full bg-[color:var(--secondary)] text-white rounded-md p-3 lg:w-2/5"
          onClick={handleNext}
        >
          {step === 1 ? "Next" : "Create your Business"}
        </button>
      </div>
    </div>
  );
}

export default CreateBusiness;

CreateBusiness.getLayout = function getLayout(page) {
  return <MainLayout route="create-business">{page}</MainLayout>;
};

function BusinessCategories(handleBusinessCategoryChange, businessCategory) {
  return (
    <FormControl sx={{ width: "100%" }}>
      <RadioGroup
        column
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

function BusinessDetails(handleChangeBizValues, businessValues) {
  const { bizName, email, phoneNumber, address, website, about } =
    businessValues;

  return (
    <form className="flex flex-col gap-4 pb-20">
      <div>
        <label
          htmlFor="business-name"
          className="text-[color:var(--deals-primary)]"
        >
          Business Name
        </label>
        <input
          type="text"
          name="bizName"
          id="bizName"
          value={bizName}
          onChange={handleChangeBizValues}
          className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
        />
      </div>
      <div>
        <label htmlFor="email" className="text-[color:var(--deals-primary)]">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeBizValues}
          className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
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
          className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
        />
      </div>
      <div>
        <label htmlFor="address" className="text-[color:var(--deals-primary)]">
          Business Address
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={handleChangeBizValues}
          className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
        />
      </div>
      <div>
        <label htmlFor="website" className="text-[color:var(--deals-primary)]">
          Website
          <span className="ml-1 font-extralight text-sm">{` (Optional)`}</span>
        </label>
        <input
          type="text"
          name="website"
          id="website"
          value={website}
          onChange={handleChangeBizValues}
          className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
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
          151/500
        </p>
      </div>
    </form>
  );
}

const categories = [
  "Restaurant",
  "Massage / Spa",
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
