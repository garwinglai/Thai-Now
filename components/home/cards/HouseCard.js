import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Link from "next/link";

function HouseCard({ directory, deal }) {
  const {
    id,
    bizName,
    photos,
    postAddressDetails,
    postTitle,
    rating,
    reviewNum,
    price,
    pricePerDisplay,
    createdAt,
  } = deal;

  const { city, state } = postAddressDetails;
  const { seconds, nanoseconds } = createdAt ? createdAt : {};

  // calculate how many days ago the post was created
  const postDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  const today = new Date();
  const daysAgo = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  const defaulImage = photos["0-1"];

  return (
    <Link
      href={`/${directory}/${id}`}
      className="shadow-lg rounded-md w-[75%] md:w-[24%] flex-shrink-0"
    >
      {defaulImage ? (
        <div className="w-full aspect-[4/3] relative">
          <Image
            src={defaulImage}
            alt="post image"
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] rounded bg-gray-200 text-xs font-extralight flex justify-center items-center">
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
          <h5 className="mt-2 font-semibold text-base">{postTitle}</h5>
          <span className="flex items-center gap-1">
            {city && (
              <p className="font-extralight text-sm">
                {city}, {state}
              </p>
            )}
          </span>
        </div>
        <div className="flex items-end">
          <h5 className=" text-sm my-2 font-semibold  text-[color:var(--secondary)]">
            {price} {pricePerDisplay}
          </h5>
        </div>
        <p className="text-xs font-extralight">{daysAgo} days ago</p>
      </div>
    </Link>
  );
}

export default HouseCard;
