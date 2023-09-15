import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Link from "next/link";

function OfferCards({ groupPostTitle, housingPost }) {
  const directory = groupPostTitle.toLowerCase();
  const {
    postTitle,
    id,
    postDescription,
    postAddressDetails,
    postAddress,
    photos,
    price,
    pricePer,
    createdAt,
  } = housingPost ? housingPost : {};

  const { city } = postAddressDetails ? postAddressDetails : {};
  const { seconds, nanoseconds } = createdAt ? createdAt : {};

  // calculate how many days ago the post was created
  const postDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  const today = new Date();
  const daysAgo = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  const priceInterval = housingPost
    ? pricePer == 0
      ? "day"
      : pricePer == 1
      ? "week"
      : pricePer == 2
      ? "month"
      : "year"
    : null;

  const [defaultImage, setDefaultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (photos) {
      // loop through photos object to find the first photo
      for (const key in photos) {
        if (photos.hasOwnProperty(key)) {
          const defaultImage = photos[key];
          setDefaultImage(defaultImage);
          break;
        }
      }
    }
  }, [photos]);

  return (
    <Link
      href={`/${directory}/${id}`}
      className="shadow-lg rounded-md min-w-[12rem]"
    >
      {defaultImage ? (
        <div className="w-full h-36 relative">
          <Image
            src={defaultImage}
            alt="post image"
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-8 h-8 rounded bg-gray-200 text-xs font-extralight flex justify-center items-center">
          .img
        </div>
      )}
      <div className="p-4">
        <div className="flex items-end gap-2">
          <StarIcon sx={{ color: yellow[700] }} fontSize="small" />
          <span className="flex gap-1 items-center">
            <p className="text-sm font-light">4.96</p>
            <p className="text-xs font-extralight ">(291 Reviews)</p>
          </span>
        </div>
        <div>
          <h5 className="text-sm font-normal">{postTitle}</h5>
          <span className="flex items-center gap-1">
            <p className="font-normal text-sm">Business name </p>
            {city && <p className="font-extralight text-sm"> - {city}</p>}
          </span>
        </div>
        {groupPostTitle === "Deals" ? (
          <h4 className=" text-base mt-2 text-[color:var(--secondary)] ">
            10% Off
          </h4>
        ) : groupPostTitle === "Housing" ? (
          <span className="flex items-end">
            <h4 className=" text-base mt-2 text-[color:var(--housing-primary)]">
              {price}
            </h4>
            {priceInterval && (
              <p className="font-extralight text-[color:var(--housing-primary)]">
                /{priceInterval}
              </p>
            )}
          </span>
        ) : (
          <span className="flex items-end">
            <h4 className=" text-base mt-2 text-[color:var(--jobs-primary)]">
              $30 - $35
            </h4>
            <p className="font-extralight text-[color:var(--jobs-primary)]">
              /hour
            </p>
          </span>
        )}
        <p className="text-xs font-extralight">{daysAgo} days ago</p>
      </div>
    </Link>
  );
}

export default OfferCards;
