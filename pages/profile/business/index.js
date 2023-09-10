import React, { useEffect, useState, useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainLayout from "@/components/layouts/MainLayout";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useRouter } from "next/router";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import CustomModal from "@/components/layouts/CustomModal";
import complete_post from "@/public/static/images/complete_post.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { useAuth } from "@/components/auth/AuthProvider";
import { db, storage } from "@/firebase/fireConfig";
import {
  doc,
  getDocs,
  collection,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createGeoHash } from "@/firebase/fireConfig";
import Geocode from "react-geocode";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  listAll,
  deleteObject,
} from "firebase/storage";
import PrimaryButtonLink from "@/components/buttons/PrimaryButtonLink";
import { getLocalStorage } from "@/utils/clientStorage";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BusinessProfile() {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [uploadedBusinessPhotos, setUploadedBusinessPhotos] = useState([]);
  const [isPublish, setIsPublish] = useState(false);
  const [bizData, setBizData] = useState({
    addressDetails: {
      addy1: "",
      addy2: "",
      city: "",
      country: "",
      state: "",
      zip: "",
    },
    name: "",
    phoneNum: "",
    email: "",
    website: "",
    bizAboutUs: "",
  });
  const [bizId, setBizId] = useState("");
  const [profilePicValues, setProfilePicValues] = useState({
    imgUrl: "",
    imageFile: "",
    fileName: "",
  });
  const [timeOptions, setTimeOptions] = useState([]);
  const [currBizHourValues, setCurrBizHourValues] = useState({
    day: "Tues",
    startTime: "8:00 AM",
    endTime: "5:00 PM",
  });
  const [bizHourValues, setBizHourValues] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { name, phoneNum, email, website, bizAboutUs, addressDetails } =
    bizData;
  const { addy1, addy2, city, state, zip } = addressDetails;
  const { imgUrl, imageFile, fileName } = profilePicValues;
  const { day, startTime, endTime } = currBizHourValues;

  const { back, push } = useRouter();
  const profilePicRef = useRef(null);

  useEffect(() => {
    if (!authUser && !loading) {
      push("/auth/signin");
    }
    // TODO: loading, show skeleton
  }, [authUser, loading]);

  useEffect(() => {
    generateTimeOptions();
  }, [uid]);

  // Helper
  const generateTimeOptions = () => {
    const options = [];
    for (let hours = 0; hours < 24; hours++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
        // Check if formattedHours has 0 as its first character and if it does, remove it
        const reFormatHours = formattedHours.replace(/^0+/, "");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const amPm = hours < 12 ? "AM" : "PM";
        const timeValue = `${reFormatHours}:${formattedMinutes} ${amPm}`;
        options.push(timeValue);
      }
    }

    setTimeOptions(options);
  };

  useEffect(() => {
    if (!uid) return;

    const fetchUser = async () => {
      const bizFromLocalStorage = getLocalStorage("bizUser");
      const bizUser = JSON.parse(bizFromLocalStorage);
      const { id, photos, profPic } = bizUser;

      //TODO: does biz My Profile nav here? if so, control photos & profPic

      setBizData(bizUser);
      setBizId(id);
    };

    fetchUser();
  }, [uid]);

  const handleBack = () => {
    // back();
    push("/business-center/business");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (imgUrl === "" || imageFile === "" || fileName === "") {
      setOpenAlert(true);
      setAlertMessage("Missing profile photo.");
      setIsLoading(false);
      return;
    }

    if (uploadedBusinessPhotos.length === 0) {
      setOpenAlert(true);
      setAlertMessage("Missing business photo(s).");
      setIsLoading(false);
      return;
    }

    const udpateBizData = await structureBizData();
    let photos = {};

    try {
      photos = await storePhotosToFirebaseStorageBusiness(
        uploadedBusinessPhotos,
        uid,
        bizId
      );
      udpateBizData.photos = photos;
    } catch (error) {
      console.log("error", error);
      setOpenAlert(true);
      setAlertMessage("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    const fullFileName = "0-1.jpg";
    const profPicStorageRef = ref(
      storage,
      `users/${uid}/biz/${bizId}/profPic/${fullFileName}`
    );

    try {
      await uploadBytes(profPicStorageRef, imageFile);
    } catch (error) {
      console.log("error", error);
      setOpenAlert(true);
      setAlertMessage("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const imgUrl = await getDownloadURL(profPicStorageRef);
      const data = {
        "0-1": imgUrl,
      };

      udpateBizData.profPic = data;
    } catch (error) {
      console.log("error", error);
      setOpenAlert(true);
      setAlertMessage("Something went wrong. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const batch = writeBatch(db);
      const bizRef = doc(db, "users", uid, "biz", bizId);
      const allBizRef = doc(db, "allBiz", bizId);

      batch.update(bizRef, udpateBizData);
      batch.update(allBizRef, udpateBizData);

      await batch.commit();

      setIsLoading(false);
      setIsPublish(true);
    } catch (error) {
      console.log("error", error);
      setOpenAlert(true);
      setAlertMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const storePhotosToFirebaseStorageBusiness = async (
    photos,
    uid,
    housingRefId
  ) => {
    let photosFromStorage = {};

    let j = 1;

    for (let i = 0; i < photos.length; i++) {
      const currPhoto = photos[i];

      const { imgUrl, imageFile } = currPhoto;
      let fileName = i + "-" + j + ".jpg";
      const photoRef = ref(
        storage,
        `users/${uid}/biz/${bizId}/images/${fileName}`
      );
      try {
        await uploadBytes(photoRef, imageFile);
      } catch (error) {
        console.log("error uploading product image:", error);
        return { error };
      }
      try {
        const photoUrl = await getDownloadURL(photoRef);
        const fileKey = fileName.split(".")[0];
        const data = {
          [fileKey]: photoUrl,
        };

        photosFromStorage = { ...photosFromStorage, ...data };
      } catch (error) {
        console.log("error getting photo url:", error);
        return { error };
      }
    }

    return photosFromStorage;
  };

  const structureBizData = async () => {
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

    const bizHours = {};

    for (let i = 0; i < bizHourValues.length; i++) {
      const currBizHour = bizHourValues[i];
      const { dayInt, startTime, endTime } = currBizHour;
      const dayStr = dayInt.toString();

      bizHours[dayStr] = {
        0: startTime,
        1: endTime,
      };
    }

    const bizData = {
      phoneNum,
      name,
      email,
      website,
      bizHours,
      bizAboutUs,
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

    return bizData;
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

  const closeModal = () => {
    setIsPublish(false);
  };

  const handleChangeBizValues = (e) => {
    const { name, value } = e.target;
    setBizData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName, imageFile: selectedImage };

    if (!uploadedBusinessPhotos.includes(imgData))
      setUploadedBusinessPhotos((prev) => [...prev, imgData]);
  };

  const handleRemoveImage = (imgUrl) => () => {
    const filteredImages = uploadedBusinessPhotos.filter(
      (image) => image.imgUrl !== imgUrl
    );
    console.log("filteredImages", filteredImages);
    setUploadedBusinessPhotos(filteredImages);
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setBizData((prev) => ({ ...prev, addressDetails: { [name]: value } }));
  };

  const handleProfilPhotoFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    const fileName = selectedImage.name;
    const imgUrl = URL.createObjectURL(selectedImage);
    const imgData = { imgUrl, fileName, imageFile: selectedImage };

    setProfilePicValues(imgData);
  };

  const handleProfilePicEditClick = () => {
    profilePicRef.current.click();
  };

  const handleChangeShopHours = (e) => {
    const { name, value } = e.target;
    setOpenAlert(false);
    setAlertMessage("");
    setCurrBizHourValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHourClick = () => {
    const isStartTimeGreaterThanEndTime = checkStartTimeGreaterThanEndTime(
      startTime,
      endTime
    );

    if (isStartTimeGreaterThanEndTime) {
      setOpenAlert(true);
      setAlertMessage("Start time is after end time.");
      return;
    }

    const dayInt =
      day === "Sun"
        ? 0
        : day === "Mon"
        ? 1
        : day === "Tues"
        ? 2
        : day === "Wed"
        ? 3
        : day === "Thurs"
        ? 4
        : day === "Fri"
        ? 5
        : 6;

    const bizHourData = {
      day,
      dayInt,
      startTime,
      endTime,
    };

    const isBizHourAlreadyAdded = bizHourValues.some(
      (bizHourValue) =>
        bizHourValue.day === day &&
        bizHourValue.startTime === startTime &&
        bizHourValue.endTime === endTime
    );

    if (isBizHourAlreadyAdded) {
      setOpenAlert(true);
      setAlertMessage("Business hour already added.");
      return;
    }

    setBizHourValues((prev) => [...prev, bizHourData]);
  };

  const handleRemoveHourClick = (bizHour) => () => {
    const filteredBizHours = bizHourValues.filter((bizHourValue) => {
      if (bizHourValue.day !== bizHour.day) {
        return true;
      } else {
        if (bizHourValue.startTime !== bizHour.startTime) {
          return true;
        } else {
          if (bizHourValue.endTime !== bizHour.endTime) {
            return true;
          }
        }
      }
      return false;
    });

    setBizHourValues(filteredBizHours);
  };

  const checkStartTimeGreaterThanEndTime = (startTimeArg, endTimeArg) => {
    const [starTime, startPeriod] = startTimeArg.split(" ");
    const [startHour, startMinute] = starTime.split(":");
    const [endTime, endPeriod] = endTimeArg.split(" ");
    const [endHour, endMinute] = endTime.split(":");

    // Convert start time to minutes since midnight
    let startMinutes =
      ((parseInt(startHour, 10) % 12) + (startPeriod === "PM" ? 12 : 0)) * 60 +
      parseInt(startMinute, 10);

    // Convert end time to minutes since midnight
    let endMinutes =
      ((parseInt(endHour, 10) % 12) + (endPeriod === "PM" ? 12 : 0)) * 60 +
      parseInt(endMinute, 10);

    // Compare start time and end time
    return startMinutes >= endMinutes;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
    setAlertMessage("");
  };

  return (
    <div className=" lg:pt-20">
      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
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
      <form onSubmit={handleSubmit} className="pb-32 lg:w-6/12 lg:mx-auto">
        <h4 className="pb-4 pt-2 pl-4">Basic information</h4>
        <div className="relative text-center mb-4">
          {imgUrl !== "" ? (
            <div className="relative w-40 h-40 mx-auto">
              <Image
                className="rounded-full object-cover"
                src={imgUrl}
                alt="profile image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-40 h-40 flex justify-center items-center rounded-full bg-gray-50 mx-auto">
              <p className="font-extralight text-sm">Profile image</p>
            </div>
          )}
          <button
            type="button"
            onClick={handleProfilePicEditClick}
            className="flex absolute left-1/2 bottom-[-15px] -translate-x-[50%] gap-1 items-center bg-white px-3 py-1 rounded-full shadow-lg"
          >
            <CameraAltOutlinedIcon fontSize="small" />
            <p className="font-extralight">Edit</p>
            <input
              ref={profilePicRef}
              type="file"
              name="profilePic"
              value=""
              id="profilePic"
              className="hidden"
              onChange={handleProfilPhotoFileChange}
            />
          </button>
        </div>
        <div className="px-4">
          <label
            htmlFor="post-title"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            Business name{" "}
            <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChangeBizValues}
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
          />
        </div>
        <div className="px-4">
          <label
            htmlFor="email"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            Email <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeBizValues}
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
          />
        </div>
        <div className="px-4">
          <label
            htmlFor="phone-number"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            Phone number{" "}
            <span className="text-[color:var(--secondary)] ">* </span>
          </label>
          <input
            required
            type="number"
            name="phoneNum"
            id="phoneNum"
            value={phoneNum}
            onChange={handleChangeBizValues}
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
          />
        </div>
        <div className="px-4">
          <label
            htmlFor="address"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            Business address
            <span className="text-[color:var(--secondary)] "> * </span>
          </label>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="addy1"
              required
              id="addy1"
              placeholder="line 1"
              value={addy1}
              onChange={handleChangeAddress}
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
            />
            <input
              type="text"
              name="addy2"
              id="addy2"
              placeholder="line 2"
              value={addy2}
              onChange={handleChangeAddress}
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
            />
            <div className="flex items-center gap-4">
              <input
                type="text"
                name="city"
                required
                id="city"
                placeholder="city"
                value={city}
                onChange={handleChangeAddress}
                className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
              />
              <input
                type="text"
                name="state"
                required
                id="state"
                placeholder="state"
                maxLength={2}
                value={state}
                onChange={handleChangeAddress}
                className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
              />
              <input
                type="number"
                name="zip"
                id="zip"
                required
                placeholder="zip"
                value={zip}
                onChange={handleChangeAddress}
                className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
              />
            </div>
          </div>
        </div>
        <div className="px-4">
          <label
            htmlFor="website"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            Website
            <span className="font-extralight">{` (Optional)`}</span>
          </label>
          <input
            type="text"
            name="website"
            id="website"
            value={website}
            onChange={handleChangeBizValues}
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
          />
        </div>
        <div className="px-4">
          <label
            htmlFor="about"
            className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
          >
            About your business
            <span className="font-extralight">{` (Optional)`}</span>
          </label>
          <textarea
            value={bizAboutUs}
            onChange={handleChangeBizValues}
            name="bizAboutUs"
            id="bizAboutUs"
            rows="5"
            className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
          />
          <p className="font-extralight">151/500</p>
        </div>
        <div className="px-4">
          <h5 className=" text-[color:var(--deals-primary)] pt-8 pb-2 ">
            Upload your business photo{" "}
            <span className="text-[color:var(--secondary)] ">* </span>
          </h5>
          <label htmlFor="photos" className="hover:cursor-pointer ">
            <input
              type="file"
              name="photos"
              id="photos"
              value=""
              className="hidden"
              onChange={handlePhotoFileChange}
            />
            <span className="flex flex-col items-center gap-4 bg-[color:var(--input-bg-secondary)] rounded py-4">
              <p className="text-[color:var(--label-color)]">
                Click to upload photos
              </p>
              <div className="bg-white rounded-full p-4">
                <PhotoSizeSelectActualIcon
                  sx={{ color: "var(--label-color)" }}
                />
              </div>
              <p className="text-[color:var(--label-color)]">Image</p>
            </span>
          </label>
          {uploadedBusinessPhotos.length !== 0 && (
            <div className="flex w-full gap-4 pt-4">
              {uploadedBusinessPhotos.map((file, idx) => {
                const { imgUrl, fileName } = file;
                return (
                  <div
                    className=" w-14 h-14 relative flex items-center justify-center lg:w-16 lg:h-16"
                    key={idx}
                  >
                    <Image
                      src={file.imgUrl}
                      alt={file.fileName}
                      fill={true}
                      className=" object-cover w-full rounded"
                      value=""
                    />
                    <div className="absolute opacity-0 flex  h-full items-end justify-center hover:opacity-70 ">
                      <div className="bg-black h-2/5 flex justify-center items-center rounded-b lg:h-1/3">
                        <IconButton>
                          <RemoveRedEyeOutlinedIcon
                            fontSize="small"
                            sx={{
                              color: "white",
                            }}
                          />
                        </IconButton>
                        <IconButton onClick={handleRemoveImage(imgUrl)}>
                          <DeleteForeverOutlinedIcon
                            fontSize="small"
                            sx={{ color: "white" }}
                          />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="text-[color:var(--label-color)]  text-sm pt-2 ">
            <span className="text-[color:var(--secondary)] ">* </span>
            Recommended photos: 11
          </p>
        </div>
        <div className="px-4">
          <h5 className=" text-[color:var(--deals-primary)] pt-8 pb-4">
            Business hours
          </h5>
          <div>
            <select
              name="day"
              onChange={handleChangeShopHours}
              id="day"
              value={day}
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
            >
              <option value="Mon">Mon</option>
              <option value="Tues">Tues</option>
              <option value="Wed">Wed</option>
              <option value="Thurs">Thurs</option>
              <option value="Fri">Fri</option>
              <option value="Sat">Sat</option>
              <option value="Sun">Sun</option>
            </select>
          </div>
          <div className="flex w-full gap-4 mt-4">
            <div className="flex-grow">
              <select
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={handleChangeShopHours}
                className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
              >
                {timeOptions.map((time, index) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <select
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={handleChangeShopHours}
                className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
              >
                {timeOptions.map((time, index) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleAddHourClick}
            type="button"
            className="border border-[color:var(--deals-primary-med)] text-[color:var(--deals-primary)] rounded px-4 py-1 mt-4"
          >
            Add Hour
          </button>

          {bizHourValues.length !== 0 &&
            bizHourValues.map((bizHour, idx) => {
              const { day, dayInt, startTime, endTime } = bizHour;

              return (
                <div
                  key={idx}
                  className="mt-4 flex items-center justify-between rounded text-[color:var(--deals-primary)] w-full p-2 h-full "
                >
                  <p>
                    {day} : {startTime} - {endTime}
                  </p>
                  <IconButton onClick={handleRemoveHourClick(bizHour)}>
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </div>
              );
            })}
        </div>
        <div className="px-4">
          <h5 className=" text-[color:var(--deals-primary)] pt-8 pb-4 ">
            Upload business qualification
            <span className="text-[color:var(--secondary)] "> * </span>
          </h5>
          <label htmlFor="photos" className="hover:cursor-pointer ">
            <input
              type="file"
              // value=""
              name="photos"
              id="photos"
              className="hidden"
              // onChange={handlePhotoFileChange}
            />
            <span className="flex flex-col items-center gap-4 bg-[color:var(--input-bg-secondary)] rounded py-4">
              <p className="text-[color:var(--label-color)]">
                Click to upload photos
              </p>
              <div className="bg-white rounded-full p-4">
                <PhotoSizeSelectActualIcon
                  sx={{ color: "var(--label-color)" }}
                />
              </div>
              <p className="text-[color:var(--label-color)]">Image</p>
            </span>
          </label>
          {/* {uploadedPhotos.length !== 0 && (
					<div className="flex w-full gap-4 pt-4">
						{uploadedPhotos.map((file, idx) => (
							<div key={idx} className=" w-14 h-14 relative">
								<Image
									src={file.imgUrl}
									alt={file.fileName}
									fill={true}
									className=" object-cover w-full rounded"
								/>
							</div>
						))}
					</div>
				)} */}
          <p className="text-[color:var(--label-color)]  text-sm pt-4 ">
            <span className="text-[color:var(--secondary)] ">* </span>
            Notes
          </p>
          <ul>
            <li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
              Check the accepted doc types.
            </li>
            <li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
              Each file must be less than 5000 KB.
            </li>
            <li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
              Images must be clear, in full-color, and contain the business
              legal name and required information.
            </li>
            <li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
              Documents must be valid and can&apos;t be expired or modified.
            </li>
            <li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
              Files must be JPEG, JPG, or PNG.
            </li>
          </ul>
        </div>
        <div className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-100 lg:left-0 lg:text-center">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <CircularProgress color="warning" />
            </div>
          ) : (
            <button
              type="submit"
              className="rounded w-full text-white bg-[color:var(--secondary)] py-2 lg:w-2/5"
            >
              Save
            </button>
          )}
        </div>
      </form>
      <CustomModal isPublish={isPublish} onClose={closeModal}>
        <div className="flex flex-col items-center text-center gap-4">
          <Image src={complete_post} alt="complete post image" />
          <h4>Complete</h4>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officiis
            laborum labore quaerat beatae similique.
          </p>
          <PrimaryButtonLink
            route="/business-center/business/create"
            name="Create your Post"
          />
          <Link
            href="/business-center/business"
            className="underline font-light text-[color:var(--deals-primary)] "
          >
            Go to Business Center
          </Link>
        </div>
      </CustomModal>
    </div>
  );
}

export default BusinessProfile;

BusinessProfile.getLayout = function getLayout(page) {
  return <MainLayout route="business-profile">{page}</MainLayout>;
};
