import React, { useState } from "react";
import Image from "next/image";
import avatar_temp from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useAuth } from "@/components/auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import { setDoc, collection, doc, Timestamp } from "firebase/firestore";

function LeaveReview({ userId, pid }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  // TODO: get displayName from authUser (for reviewer name)

  const [ratingValue, setRatingValue] = useState(null);
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRatingChange = (e, newValue) => {
    setRatingValue(newValue);
  };

  const handleReviewChange = (e) => {
    const { value, name } = e.target;
    const reviewLength = value.length;

    if (reviewLength > 500) {
      setErrorMessage("Word limit reached.");
      return;
    }
    setReview(value);
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (review === "") {
      setErrorMessage("Please enter a review");
      return;
    }
    if (ratingValue === null) {
      setErrorMessage("Please select a rating");
      return;
    }

    const reviewsref = doc(collection(db, "allReviews"));
    const reviewId = reviewsref.id;

    const reviewData = {
      review,
      rating: ratingValue,
      reviewerName: "Garwing",
      userId: uid,
      postType: 3, //0:jobs 1:deals, 2:marketplace, 3:housing
      postDisplay: "housing",
      postId: pid,
      posterId: userId,
      createdAt: Timestamp.now(),
    };

    try {
      await setDoc(reviewsref, reviewData);
      setReview("");
      setRatingValue(null);
    } catch (error) {
      console.log("error");
      // TODO: handle error for leaving review
    }
  };

  return (
    <form onSubmit={handlePostReview} className="border rounded my-4">
      <div className="flex items-center gap-4 px-6 pt-6">
        <Image
          src={avatar_temp}
          alt="image of reviewee"
          className="h-16 w-16 object-cover"
        />
        <span className="flex flex-col">
          <p className="">James C.</p>
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
          value={review}
          name="review"
          id="review-text-area"
          rows="5"
          placeholder="Enter your review ..."
          className="p-2 rounded bg-[color:var(--input-bg-secondary)] text-sm placeholder:text-sm w-full"
        ></textarea>
        <p className="font-extralight text-xs text-[color:var(--placeholder-color)] ">
          {review.length}/500
        </p>
      </div>
      <div className="mx-4 my-6">
        <PrimaryButton
          name="Add Comment"
          type="submit"
          handleClick={handlePostReview}
        />
      </div>
    </form>
  );
}

export default LeaveReview;
