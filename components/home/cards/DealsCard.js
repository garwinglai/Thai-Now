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
    photos,
    id,
  } = deal;

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
          <p className={`${styles.biz_type}`}>
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
    <Link href={`/housing/${id}`} className={`${styles.deals_card}`}>
      {photos && (
        <div className="relative w-full h-40">
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
        <h5>{postTitle}</h5>
        <p className={`${styles.biz_name_location}`}>
          {bizName} - {location}
        </p>
        {footerTag()}
      </div>
    </Link>
  );
}

export default DealsCard;
