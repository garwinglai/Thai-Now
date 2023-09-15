import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import { Alert, IconButton } from "@mui/material";
import JobsFormOne from "@/components/business-center/jobs/JobsFormOne";
import JobsFormTwo from "@/components/business-center/jobs/JobsFormTwo";
import JobsFormThree from "@/components/business-center/jobs/JobsFormThree";
import JobsFormFour from "@/components/business-center/jobs/JobsFormFour";
import JobsFormFive from "@/components/business-center/jobs/JobsFormFive";
import JobsFormSix from "@/components/business-center/jobs/JobsFormSix";
import { useAuth } from "@/components/auth/AuthProvider";
import { getLocalStorage } from "@/utils/clientStorage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/fireConfig";
import { createGeoHash } from "@/firebase/fireConfig";
import Geocode from "react-geocode";
import { Timestamp } from "firebase/firestore";
import {
  createJobPostBusiness,
  saveJobsBusinessDraft,
} from "@/helper/client/jobs";
import CircularProgress from "@mui/material/CircularProgress";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

function JobsPostBusinessUser() {
  const { authUser, loading } = useAuth();
  const { uid, email, displayName } = authUser || {};

  const [isPublish, setIsPublish] = useState(false);
  const [step, setStep] = useState(1);
  const [jobValues, setJobValues] = useState({
    postTitle: "",
    postDescription: "",
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
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState("");
  const [userData, setUserData] = useState({});
  const [bizId, setBizId] = useState("");
  const [bizName, setBizName] = useState("");
  const [bizProfPic, setBizProfPic] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const {
    postTitle,
    postDescription,
    jobType,
    jobLocation,
    skills,
    workExperience,
  } = jobValues;
  const { minPrice, maxPrice, interval } = salaryRange;
  const { isSnackBarOpen, snackMessage } = snackBar;

  const { back, push } = useRouter();

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  useEffect(() => {
    if (!uid) return;
    const fetchUser = async () => {
      const bizUser = JSON.parse(getLocalStorage("bizUser"));
      const { id: bizId, name, profPic } = bizUser;
      setBizId(bizId);
      setBizName(name);
      setBizProfPic(profPic["0-1"]);

      if (bizId) {
        const userRef = doc(db, "users", uid, "biz", bizId);

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserData(userData);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUser();
  }, [authUser]);

  const handleNext = async () => {
    if (step === 1) {
      if (postTitle === "") {
        setSnackBar((prev) => ({
          isSnackBarOpen: true,
          snackMessage: "Missing job title.",
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
    }

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
      setIsLoading(true);
      await publishPost();
      setIsLoading(false);
      return;
    }

    setStep((prev) => (prev += 1));
  };

  const publishPost = async () => {
    const jobPostData = await structureJobPostData();
    console.log("jobPostData", jobPostData);

    const { success, error, postId } = await createJobPostBusiness(
      jobPostData,
      uid,
      bizId
    );
    console.log("success", success);
    console.log("error", error);

    if (success) {
      setIsPublish(true);
      setPostId(postId);
    }
    // TODO: handle housing post error
  };

  const handleSaveAndExit = async () => {
    setIsLoading(true);
    const jobPostData = await structureJobPostData();
    // 0: jobs 1:deals, 2:marketplace, 3:housing

    const { success, error } = await saveJobsBusinessDraft(
      jobPostData,
      uid,
      bizId
    );

    if (success) {
      push("/business-center/business");
      setIsLoading(false);
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

  const structureJobPostData = async () => {
    const { addressDetails } = userData;
    const { addy1, addy2, city, state, zip } = addressDetails;
    let postAddress = "";
    let lat = "";
    let lng = "";
    let geohash = "";

    if (addy1 !== "" && city !== "" && state !== "" && zip !== "") {
      postAddress = addy1 + " " + addy2 + " " + city + " " + state + " " + zip;
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

    const jobInt =
      jobType === "Full-time"
        ? 0
        : jobType === "Part-time"
        ? 1
        : jobType === "Internship"
        ? 2
        : jobType === "On-demand"
        ? 3
        : jobType === "Seasonal"
        ? 4
        : jobType === "Volunteer"
        ? 5
        : 6;

    const jobSiteInt =
      jobLocation === "On-site" ? 0 : jobLocation === "Remote-accepted" ? 1 : 2;

    const experience =
      workExperience === "No experience"
        ? 0
        : workExperience === "1-2 years"
        ? 1
        : workExperience === "3-5 years"
        ? 2
        : 3;

    // capitalize interval first letter
    const intervalFirstLetter = interval.charAt(0).toUpperCase();
    const intervalRestLower = interval.slice(1);
    const newInterval = intervalFirstLetter + intervalRestLower;
    const salaryStart = parseFloat(parseFloat(minPrice).toFixed(2));
    const salaryEnd = parseFloat(parseFloat(maxPrice).toFixed(2));
    const salaryBasisIndex =
      interval === "hour" ? 0 : interval === "month" ? 2 : 1;
    const salaryDisplay = `$${parseFloat(minPrice).toFixed(2)} - $${parseFloat(
      maxPrice
    ).toFixed(2)} per ${newInterval}`;

    const submission = [];

    if (jobContactMethodEmail) submission.push(0);
    if (jobContactMethodPhone) submission.push(1);
    if (jobContactMethodInPerson) submission.push(2);

    const jobPostData = {
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
      postCoord: {
        lat,
        lng,
      },
      geohash,
      userId: uid,
      userName: displayName,
      bizUserId: bizId,
      bizName,
      bizProfPic,
      posterType: 1,
      jobTypeDisplay: jobType,
      jobType: jobInt, // 0: Full-time, 1: Part-time, 2: Internship, 3: On-demand, 4: Seasonal, 5: Volunteer, 6: Freelance
      jobSite: jobSiteInt, // 0: On-site, 1: Remote-accepted, 2: Remote-only
      jobSiteDisplay: jobLocation,
      experience, // 0: No experience, 1: 1-2 years, 2: 3-5 years, 3: +5 years
      experienceDisplay: workExperience,
      skills,
      requireVisa: !hasJobVisa,
      salaryStart,
      salaryEnd,
      salaryDisplay,
      salaryBasis: newInterval,
      salaryBasisIndex, // 0: hour, 1: annual, 2: month
      submission, //array of submission methods 0: email, 1: phone, 2: in-person
      rating: 0,
      postType: 0, // postType | 0: jobs, 1: deals, 2: marketplace, 3: housing
      reviewNum: 0,
      newAddedPhotos: uploadedPhotos,
      oldPhotos: [],
    };

    return jobPostData;
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

    if (!selectedImage) return;

    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName, imageFile: selectedImage };

    if (!uploadedPhotos.includes(imgData))
      setUploadedPhotos((prev) => [...prev, imgData]);
  };

  const handleRemoveImage = (imgUrl) => () => {
    const filteredPhotos = uploadedPhotos.filter(
      (photo) => photo.imgUrl !== imgUrl
    );
    setUploadedPhotos(filteredPhotos);
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
          handleRemoveImage={handleRemoveImage}
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
          userData={userData}
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
          isBusinessUser={true}
          userData={userData}
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
        <div className="flex items-center gap-1 pl-4 pt-4 lg:gap-2 lg:pt-8 lg:pl-16">
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
          <span
            className={`flex-grow h-1  ${
              step === 7
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
              {step === 6 ? "Publish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default JobsPostBusinessUser;

JobsPostBusinessUser.getLayout = function getLayout(page) {
  return <MainLayout route="business-center">{page}</MainLayout>;
};
