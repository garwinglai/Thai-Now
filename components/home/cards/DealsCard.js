import React from "react";
import styles from "../../../styles/components/home/cards/deals-card.module.css";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Link from "next/link";

function DealsCard({ deal, title }) {
  const {
    discount,
    rating,
    reviewNum,
    description,
    bizName,
    location,
    postTitle,
    price,
    pricePerDisplay,
    photos,
    createdAt,
    id,
  } = deal;

  const { seconds, nanoseconds } = createdAt ? createdAt : {};

  const postDate = new Date(seconds * 1000 + nanoseconds / 1000000);
  const today = new Date();
  const daysAgo = Math.floor((today - postDate) / (1000 * 60 * 60 * 24));

  const footerTag = () => {
    switch (title) {
      case "Deals of the week":
        return (
          <p className={`${styles.biz_type}`}>
            <span className={`${styles.bullet_point_bit_type}`}>•</span>{" "}
            Restaurant
          </p>
        );
        break;
      case "Job available":
        return (
          <p className={`${styles.biz_type}`}>
            <span className={`${styles.bullet_point_bit_type}`}>•</span> $ - $
            per Hour | Fulltime
          </p>
        );
        break;
      case "Room for rent":
        return (
          <p className={`${styles.biz_type}`}>
            <span className={`${styles.bullet_point_bit_type}`}>•</span> Los
            Angeles, CA
          </p>
        );
        break;
      case "Staff pick item":
        return (
          <p className="text-xs font-extralight mt-4">
            <span className={`${styles.bullet_point_bit_type}`}>•</span> Los
            Angeles, CA
          </p>
        );
        break;

      default:
        break;
    }
  };

  return (
    <Link
      href={`/housing/${id}`}
      className="shadow-lg rounded-md w-[75%] md:w-[24%] flex-shrink-0"
    >
      {photos && (
        <div className="w-full aspect-[4/3] relative ">
          <Image
            src={photos["0-1"]}
            alt="business image"
            fill
            className="object-cover rounded-t-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className={`${styles.card_bottom}`}>
        <div className="flex gap-2 items-end">
          <StarIcon sx={{ color: yellow[700] }} fontSize="small" />
          <span className="flex gap-1 items-center">
            <p className="text-sm font-light">{rating}</p>
            <p className="text-xs font-light">({reviewNum} Reviews)</p>
          </span>
        </div>
        <h5 className="mt-2 font-semibold text-base">{postTitle}</h5>
        <p className="font-extralight text-sm">
          {bizName} - {location}
        </p>
        <div className="flex items-end">
          <h5 className=" text-sm my-2 font-semibold  text-[color:var(--secondary)]">
            {price} {pricePerDisplay}
          </h5>
        </div>
        <p className="text-xs font-extralight">{daysAgo} days ago</p>
        {/* {footerTag()} */}
      </div>
    </Link>
  );
}

export default DealsCard;
