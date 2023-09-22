import React from "react";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";

// TODO: need reviewer image and display name.

function ReviewComponent({ reviewData }) {
  const {
    reviewText,
    stars,
    userFName,
    userId,
    userLName,
    userProf,
    createdAt,
  } = reviewData;

  const reviewerName = `${userFName} ${userLName}`;

  const { seconds, nanoseconds } = createdAt;

  const postDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  const today = new Date();

  //how many days ago was posted
  const diffTime = Math.abs(today - postDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="pb-4 border-b border-[color:var(--border)]">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-2 items-center my-4">
          <div className="w-14 h-14 relative">
            <Image
              src={userProf}
              alt="avatar image"
              className="object-cover rounded-full"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="flex flex-col">
            <h4>{reviewerName}</h4>
            <div className="flex gap-2 items-center">
              <Rating
                name="size-small"
                value={stars}
                sx={{ color: "var(--secondary)", fontSize: "10px" }}
                readOnly
              />
              <p className="font-extralight text-xs text-gray-600">
                {diffDays} days ago
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <IconButton>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <p className="font-extralight text-xs text-gray-600">{reviewText}</p>
    </div>
  );
}

export default ReviewComponent;
