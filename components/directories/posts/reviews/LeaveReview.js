import React, { useState } from "react";
import Image from "next/image";
import avatar_temp from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useAuth } from "@/components/auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import {
  setDoc,
  collection,
  doc,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function LeaveReview({
  userId,
  pid,
  userData,
  isBusinessUser,
  postType,
  postTitle,
  photos,
}) {
  const { authUser, loading } = useAuth();
  const { uid, displayName } = authUser || {};

  const { name, fName, lName, profPic } = userData ? userData : {};
  const defaultProfPic = profPic ? profPic["0-1"] : "";

  // TODO: get displayName from authUser (for reviewer name)

  const [ratingValue, setRatingValue] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpenSnackbar = (message) => {
    setOpenSnackbar(true);
    setErrorMessage(message);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setErrorMessage("");
  };

  const handleRatingChange = (e, newValue) => {
    setRatingValue(newValue);
  };

  const handleReviewChange = (e) => {
    const { value, name } = e.target;
    const reviewLength = value.length;

    if (reviewLength > 500) {
      handleOpenSnackbar("Word limit reached.");

      return;
    }
    setReviewText(value);
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (reviewText === "") {
      handleOpenSnackbar("Please enter a review");

      return;
    }
    if (ratingValue === null) {
      handleOpenSnackbar("Please enter a review");
      return;
    }

    const firestorePath =
      postType === "housing"
        ? "allHousing"
        : postType === "marketplace"
        ? "allMarketplace"
        : "allJobs";

    const reviewsRef = doc(collection(db, "allReviews"));
    const reviewId = reviewsRef.id;
    const inAllCollectionReviewRef = doc(
      db,
      firestorePath,
      pid,
      "reviews",
      reviewId
    );

    const reviewData = {
      createdAt: Timestamp.now(),
      reviewText,
      postUploaderName: isBusinessUser ? name : `${fName} ${lName}`,
      stars: ratingValue,
      origin: firestorePath,
      postId: pid,
      postTitle,
      postImg: photos["0-1"],
      postType: 3, //0:jobs 1:deals, 2:marketplace, 3:housing
      posterId: userId,
    };

    const reviewDataPublic = {
      createdAt: Timestamp.now(),
      reviewText,
      stars: ratingValue,
      posterId: userId,
      userId: userId, //! This is the same as posterId, but andrew has this here, so I'm just adding.
      userFName: isBusinessUser ? name : fName,
      userLName: lName,
      userProf: defaultProfPic,
    };

    try {
      const batch = writeBatch(db);

      batch.set(reviewsRef, reviewDataPublic);
      batch.set(inAllCollectionReviewRef, reviewDataPublic);

      await batch.commit();

      setReviewText("");
      setRatingValue(null);
    } catch (error) {
      console.log("error", error);
      // TODO: handle error for leaving review
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <form onSubmit={handlePostReview} className="border rounded my-4">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        action={action}
      />
      <div className="flex items-center gap-4 px-6 pt-6">
        {defaultProfPic && (
          <div className="h-16 w-16 relative rounded">
            <Image
              src={profPic["0-1"]}
              alt="profile image"
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <span className="flex flex-col">
          <p className="">{isBusinessUser ? name : `${fName} ${lName}`}</p>
          <p className="font-light text-sm">Los Angeles</p>
        </span>
      </div>
      <div className="text-center py-6">
        <Rating
          name="simple-controlled"
          value={ratingValue}
          onChange={handleRatingChange}
          size="large"
        />
        <p className="font-light text-[color:var(--deals-primary)]">
          Start your review
        </p>
      </div>
      <div className="px-4">
        <textarea
          onChange={handleReviewChange}
          value={reviewText}
          name="reviewText"
          id="review-text-area"
          rows="5"
          placeholder="Enter your review ..."
          className="p-2 rounded bg-[color:var(--input-bg-secondary)] text-sm placeholder:text-sm w-full"
        ></textarea>
        <p className="font-extralight text-xs text-[color:var(--placeholder-color)] ">
          {reviewText.length}/500
        </p>
      </div>
      <div className="mx-4 my-6">
        <PrimaryButton name="Add Comment" type="submit" />
      </div>
    </form>
  );
}

export default LeaveReview;
