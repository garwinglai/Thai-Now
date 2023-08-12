import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import HousingFormOne from "@/components/business-center/housing/HousingFormOne";
import HousingFormTwo from "@/components/business-center/housing/HousingFormTwo";
import HousingFormThree from "@/components/business-center/housing/HousingFormThree";
import HousingFormFour from "@/components/business-center/housing/HousingFormFour";
import { Alert, IconButton } from "@mui/material";
import JobsFormOne from "@/components/business-center/jobs/JobsFormOne";
import JobsFormTwo from "@/components/business-center/jobs/JobsFormTwo";
import JobsFormThree from "@/components/business-center/jobs/JobsFormThree";
import JobsFormFour from "@/components/business-center/jobs/JobsFormFour";
import JobsFormFive from "@/components/business-center/jobs/JobsFormFive";
import JobsFormSix from "@/components/business-center/jobs/JobsFormSix";
import { useAuth } from "@/components/auth/AuthProvider";

function EditJobs({ pid }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [jobValues, setJobValues] = useState({
    title: "",
    description: "",
    jobType: "Full-time",
    jobLocation: "On-site",
    workExperience: "No experience",
    skills: "",
  });
  const [hasJobVisa, setHasJobVisa] = useState(false);
  const [salaryRange, setSalaryRange] = useState({
    minPrice: "",
    maxPrice: "",
    interval: "hour",
  });
  const [jobContactMethodEmail, setJobContactMethodEmail] = useState(true);
  const [jobContactMethodPhone, setJobContactMethodPhone] = useState(false);
  const [jobContactMethodInPerson, setJobContactMethodInPerson] =
    useState(false);
  const [snackBar, setSnackBar] = useState({
    isSnackBarOpen: false,
    snackMessage: "",
  });

  const { title, description } = jobValues;
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const { minPrice, maxPrice } = salaryRange;

  const { isSnackBarOpen, snackMessage } = snackBar;

  const { back, push } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

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
    }

    // if (step === 2) {
    // 	if (guestCount === 0) {
    // 		setSnackBar((prev) => ({
    // 			isSnackBarOpen: true,
    // 			snackMessage: "Number of guests required.",
    // 		}));
    // 		return;
    // 	}

    // 	if (bedroomCount === 0) {
    // 		setSnackBar((prev) => ({
    // 			isSnackBarOpen: true,
    // 			snackMessage: "Number of bedrooms required.",
    // 		}));
    // 		return;
    // 	}
    // }

    // if (step === 3) {
    // 	if (priceOption === "exact") {
    // 		if (exactPrice.price === "") {
    // 			setSnackBar((prev) => ({
    // 				isSnackBarOpen: true,
    // 				snackMessage: "Please enter a price.",
    // 			}));
    // 			return;
    // 		}
    // 	}
    // 	if (priceOption === "range") {
    // 		if (priceRange.minPrice === "" || priceRange.maxPrice === "") {
    // 			setSnackBar((prev) => ({
    // 				isSnackBarOpen: true,
    // 				snackMessage: "Please enter a price range.",
    // 			}));
    // 			return;
    // 		}
    // 	}
    // }

    if (step === 4) {
      if (minPrice === "" || maxPrice === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Please enter a price range.",
        }));
        return;
      }
    }

    if (step === 6) {
      setIsPublish(true);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const closeModal = () => {
    setIsPublish(false);
  };

  const handleBack = () => {
    if (step === 1) {
      back();
    } else {
      setStep((prev) => (prev -= 1));
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
  };

  const handleJobValueChange = (e) => {
    const { value, name } = e.target;
    setJobValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleHasJobVisaChange = (e) => {
    const isChecked = e.target.checked;
    setHasJobVisa(isChecked);
  };

  const handlePhotoFileChange = (e) => {
    const selectedImage = e.target.files[0];
    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName };

    if (!uploadedPhotos.includes(imgData))
      setUploadedPhotos((prev) => [...prev, imgData]);
  };

  const handleSalaryRangeChange = (e) => {
    const { value, name } = e.target;
    setSalaryRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactEmailChange = (e) => {
    const isChecked = e.target.checked;
    setJobContactMethodEmail(isChecked);
  };

  const handleContactPhoneChange = (e) => {
    const isChecked = e.target.checked;
    setJobContactMethodPhone(isChecked);
  };

  const handleContactInPersonChange = (e) => {
    const isChecked = e.target.checked;
    setJobContactMethodInPerson(isChecked);
  };

  const displayHousingPostForms = (step) => {
    if (step === 1)
      return (
        <JobsFormOne
          handlePhotoFileChange={handlePhotoFileChange}
          uploadedPhotos={uploadedPhotos}
          handleJobValueChange={handleJobValueChange}
          jobValues={jobValues}
        />
      );
    if (step === 2)
      return (
        <JobsFormTwo
          handleJobValueChange={handleJobValueChange}
          jobValues={jobValues}
        />
      );
    if (step === 3)
      return (
        <JobsFormThree
          handleJobValueChange={handleJobValueChange}
          jobValues={jobValues}
          hasJobVisa={hasJobVisa}
          handleHasJobVisaChange={handleHasJobVisaChange}
        />
      );
    if (step === 4)
      return (
        <JobsFormFour
          handleSalaryRangeChange={handleSalaryRangeChange}
          salaryRange={salaryRange}
        />
      );
    if (step === 5)
      return (
        <JobsFormFive
          jobContactMethodEmail={jobContactMethodEmail}
          jobContactMethodPhone={jobContactMethodPhone}
          jobContactMethodInPerson={jobContactMethodInPerson}
          handleContactEmailChange={handleContactEmailChange}
          handleContactInPersonChange={handleContactInPersonChange}
          handleContactPhoneChange={handleContactPhoneChange}
        />
      );
    if (step === 6)
      return (
        <JobsFormSix
          closeModal={closeModal}
          isPublish={isPublish}
          uploadedPhotos={uploadedPhotos}
          jobValues={jobValues}
          salaryRange={salaryRange}
          hasJobVisa={hasJobVisa}
          jobContactMethodEmail={jobContactMethodEmail}
          jobContactMethodInPerson={jobContactMethodInPerson}
          jobContactMethodPhone={jobContactMethodPhone}
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
          <span
            className={`flex-grow h-1  ${
              step === 6
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
            {step === 6 ? "Publish" : "Next"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditJobs;

EditJobs.getLayout = function getLayout(page) {
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
