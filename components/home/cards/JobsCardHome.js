import React, { useEffect, useState } from "react";
import Image from "next/image";
import biz_temp from "@/public/static/images/home/biz-temp.png";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

function JobsCardHome({ directory, deal }) {
  const {
    id,
    bizName,
    bizProfPic,
    postAddressDetails,
    postTitle,
    rating,
    reviewNum,
    salaryDisplay,
    createdAt,
  } = deal;

  const { city } = postAddressDetails;
  const { seconds, nanoseconds } = createdAt ? createdAt : {};

  // calculate how many days ago the post was created
  const postDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  const today = new Date();
  const daysAgo = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  return (
    <Link
      href={`/${directory}/${id}`}
      className="shadow-lg rounded-md min-w-[12rem]"
    >
      {bizProfPic ? (
        <div className="w-full h-36 relative">
          <Image
            src={bizProfPic}
            alt="post image"
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full h-36 rounded bg-gray-200 text-xs font-extralight flex justify-center items-center">
          .img
        </div>
      )}
      <div className="p-4">
        <div className="flex items-end gap-2">
          <StarIcon sx={{ color: yellow[700] }} fontSize="small" />
          <span className="flex gap-1 items-center">
            <p className="text-sm font-light">{rating}</p>
            <p className="text-xs font-extralight ">({reviewNum} Reviews)</p>
          </span>
        </div>
        <div>
          <h5 className="text-sm font-normal">{postTitle}</h5>
          <span className="flex items-center gap-1">
            <p className="font-normal text-sm">{bizName}</p>
            {city && <p className="font-extralight text-sm"> - {city}</p>}
          </span>
        </div>
        <div className="flex items-end">
          <h4 className=" text-base mt-2 text-[color:var(--jobs-primary)]">
            {salaryDisplay}
          </h4>
        </div>
        <p className="text-xs font-extralight">{daysAgo} days ago</p>
      </div>
    </Link>
  );
}

export default JobsCardHome;
