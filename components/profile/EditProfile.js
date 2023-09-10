import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/fireConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// TODO: add address option if biz.

function EditProfile({ uid }) {
  const [profileValues, setProfileValues] = useState({
    fName: "",
    lName: "",
    phoneNum: "",
    email: "",
    profPic: "",
    // addressDetails: {
    //   addy1: "",
    //   addy2: "",
    //   city: "",
    //   state: "",
    //   zip: "",
    // },
  });
  const [newProfilePicSelected, setNewProfilePicSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const profPicRef = useRef(null);

  useEffect(() => {
    if (!uid) return;

    const getUserProfile = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // destructure data
        const { fName, lName, phoneNum, email, profPic, addressDetails } = data;

        setProfileValues({
          fName: fName || "",
          lName: lName || "",
          phoneNum: phoneNum || "",
          email: email || "",
          profPic: profPic["0-1"] || "",
          // addressDetails,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    getUserProfile();
  }, [uid]);

  // destructure profileValues
  const { fName, lName, phoneNum, email, profPic, addressDetails } =
    profileValues;
  // destructure addressDetails
  // const { addy1, addy2, city, state, zip } = addressDetails;
  const [openAlert, setOpenAlert] = useState(false);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleProfileEditClick = (e) => {
    profPicRef.current.click();
  };

  const handleProfPicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name;
    const imgUrl = URL.createObjectURL(file);
    const imgData = { imgUrl, fileName, imageFile: file };

    setProfileValues((prevState) => ({
      ...prevState,
      profPic: imgUrl,
    }));
    setNewProfilePicSelected(imgData);
  };

  const handleChangeProfileValues = (e) => {
    const { name, value } = e.target;

    if (
      name === "addy1" ||
      name === "addy2" ||
      name === "city" ||
      name === "state" ||
      name === "zip"
    ) {
      setProfileValues((prevState) => ({
        ...prevState,
        addressDetails: {
          ...prevState.addressDetails,
          [name]: value,
        },
      }));
      return;
    }

    setProfileValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (
    //   (addy1 !== "" ||
    //     addy2 !== "" ||
    //     city !== "" ||
    //     state !== "" ||
    //     zip !== "") &&
    //   (addy1 === "" || city === "" || state === "" || zip === "")
    // ) {
    //   setOpenAlert(true);
    //   return;
    // }

    const profileData = profileValues;
    // delete profileData.addressDetails;

    if (newProfilePicSelected.imageFile) {
      const { imageFile } = newProfilePicSelected;
      const fullFileName = "0-1.jpg";
      const storageRef = ref(
        storage,
        `users/${uid}/profile/main/${fullFileName}`
      );
      try {
        await uploadBytes(storageRef, imageFile);
      } catch (error) {
        console.log("error", error);
      }
      try {
        const imgUrl = await getDownloadURL(storageRef);
        const data = {
          "0-1": imgUrl,
        };
        profileData.profPic = data;
      } catch (error) {
        console.log("download", error);
      }
    } else {
      delete profileData.profPic;
    }

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, profileData);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const { fName, lName, phoneNum, email, profPic, addressDetails } = userData;

    setProfileValues({
      fName: fName || "",
      lName: lName || "",
      phoneNum: phoneNum || "",
      email: email || "",
      profPic: profPic["0-1"] || "",
      // addressDetails,
    });
    setNewProfilePicSelected({});

    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          Missing address field.
        </Alert>
      </Snackbar>
      <h2 className="text-center my-4 lg:text-left lg:mb-0">Personal info</h2>
      <p className="hidden lg:block lg:font-extralight lg:mb-6">
        People visitng your profile will see the following info
      </p>
      <div className="relative mb-12">
        {profPic !== "" ? (
          <div className="relative w-28 aspect-square lg:h-28 mx-auto lg:ml-0 rounded-full">
            <Image
              className="rounded-full object-cover"
              src={profPic}
              alt="profile image"
              priority={true}
              fill
              placeholder="blur"
              blurDataURL={"/img/logo.png"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="rounded-full w-28 h-28 mx-auto lg:ml-0 flex justify-center items-center text-center bg-[color:var(--filter-bg)]">
            <p className="text-xs font-extralight">No profile image</p>
          </div>
        )}

        <button
          onClick={handleProfileEditClick}
          className="flex items-center gap-1 absolute left-1/2 bottom-[-20px] bg-white rounded-full py-1 px-2 shadow-md -translate-x-1/2 lg:left-[3.5rem] lg:py-1 lg:px-2 lg:bottom-[-10px]"
        >
          <CameraAltOutlinedIcon fontSize="extra small" />
          <p className="font-light text-gray-400 lg:text-xs lg:text-gray-900">
            Edit
          </p>
          <input
            type="file"
            name="profPick"
            id="profPic"
            className="hidden"
            ref={profPicRef}
            onChange={handleProfPicChange}
          />
        </button>
      </div>
      <form onSubmit={handleSaveProfile} className="flex flex-col gap-8">
        <TextField
          required
          id="first-name"
          label="First name"
          name="fName"
          fullWidth
          type="text"
          color="warning"
          size="small"
          value={fName}
          onChange={handleChangeProfileValues}
        />
        <TextField
          required
          id="last-name"
          label="Last name"
          name="lName"
          fullWidth
          type="text"
          color="warning"
          size="small"
          value={lName}
          onChange={handleChangeProfileValues}
        />
        <TextField
          id="phone-number"
          label="Phone number"
          fullWidth
          type="number"
          color="warning"
          size="small"
          name="phoneNum"
          value={phoneNum}
          onChange={handleChangeProfileValues}
        />
        <TextField
          required
          id="email"
          label="Email"
          fullWidth
          type="email"
          color="warning"
          size="small"
          name="email"
          value={email}
          onChange={handleChangeProfileValues}
        />
        {/* <TextField
          id="addy1"
          label="Address 1"
          fullWidth
          type="text"
          color="warning"
          size="small"
          name="addy1"
          value={addy1}
          onChange={handleChangeProfileValues}
        />
        <TextField
          id="addy2"
          label="Address 2"
          fullWidth
          type="text"
          color="warning"
          size="small"
          value={addy2}
          name="addy2"
          onChange={handleChangeProfileValues}
        />
        <div className="flex gap-4">
          <TextField
            id="city"
            label="City"
            fullWidth
            type="text"
            color="warning"
            size="small"
            name="city"
            value={city}
            onChange={handleChangeProfileValues}
          />
          <TextField
            id="state"
            label="State"
            fullWidth
            type="text"
            color="warning"
            size="small"
            inputProps={{ maxLength: 2 }}
            value={state}
            name="state"
            onChange={handleChangeProfileValues}
          />
          <TextField
            id="zip"
            label="Zip"
            fullWidth
            type="number"
            color="warning"
            size="small"
            value={zip}
            name="zip"
            onChange={handleChangeProfileValues}
          />
        </div> */}
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <CircularProgress color="warning" />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-[color:var(--secondary)] text-white py-3 rounded text-sm"
          >
            Save
          </button>
        )}
      </form>
    </React.Fragment>
  );
}

export default EditProfile;
