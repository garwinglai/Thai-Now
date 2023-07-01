import Image from "next/image";
import React from "react";
import biz_temp from "@/public/static/images/home/biz-temp.png";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import Link from "next/link";

function OfferCards({ groupPostTitle }) {
  return (
    <Link href="/jobs/post-title" className="shadow-lg rounded-md min-w-[12rem]">
      <Image src={biz_temp} />
      <div className="p-4">
        <div className="flex items-end gap-2">
          <StarIcon sx={{ color: yellow[700] }} fontSize="small" />
          <span className="flex gap-1 items-center">
            <p className="text-sm font-light">4.96</p>
            <p className="text-xs font-extralight ">(291 Reviews)</p>
          </span>
        </div>
        <div>
          <h5 className="text-sm font-normal">Post title</h5>
          <span className="flex items-center gap-1">
            <p className="font-normal text-sm">Business name </p>
            <p className="font-extralight text-sm"> - Location</p>
          </span>
        </div>
        {groupPostTitle === "Deals" ? (
          <h4 className=" text-base mt-2 text-[color:var(--secondary)] ">
            10% Off
          </h4>
        ) : groupPostTitle === "Housing" ? (
          <span className="flex items-end">
            <h4 className=" text-base mt-2 text-[color:var(--housing-primary)]">
              $30 - $35
            </h4>
            <p className="font-extralight text-[color:var(--housing-primary)]">
              /night
            </p>
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
        <p className="text-xs font-extralight">1 days ago</p>
      </div>
    </Link>
  );
}

export default OfferCards;
