import React from "react";
import { useRouter } from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";

function BusinessCenterPageHeader({ isBusinessUser, userData }) {
  const {
    name: bizName,
    fName,
    lName,
    numReviews,
    reviewScore,
    city,
    addressDetails,
    rating,
    reviewNum,
  } = userData || {};

  const { back } = useRouter();

  const handleBack = () => {
    back();
  };

  return (
    <div className="p-4 bg-white lg:rounded-md">
      <button onClick={handleBack} className="flex content-center gap-1">
        <ChevronLeftIcon />
        <p className="text-blue-950">Back</p>
      </button>
      <div className="flex gap-4 pt-8 pb-2 justify-between items-center w-full">
        <div className="flex justify-between gap-4">
          <Image
            src={avatar_image}
            alt="profile image"
            className=" w-14 h-14"
          />
          <div className="flex flex-col">
            <p>Welcome</p>
            {bizName ? (
              <h4>{bizName}</h4>
            ) : (
              <h4>
                {fName} {lName}
              </h4>
            )}
          </div>
        </div>
        <Link
          href={`${
            isBusinessUser
              ? `/business-center/business/public-page`
              : `/business-center/classic/public-page`
          }`}
          className=" bg-[color:var(--secondary)]  text-white px-3 py-2 text-xs h-full rounded "
        >
          View public page
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <StarIcon fontSize="small" sx={{ color: "orange" }} />
        <p className="font-light">{isBusinessUser ? rating : reviewScore}</p>
        <p className=" font-extralight text-gray-600">
          ({isBusinessUser ? reviewNum : numReviews} Reviews) -{" "}
          {addressDetails
            ? addressDetails.city + ", " + addressDetails.state
            : "No location provided"}
        </p>
      </div>
      {isBusinessUser && (
        <div className="flex justify-between bg-[color:var(--verify-bg)] rounded-md p-2 mb-4 mt-6 items-center">
          <p className="text-[color:var(--deals-primary)] text-sm font-light">
            Verify your business on ThaiNow and build trust with customers
          </p>
          <button className="bg-white font-normal text-xs border border-opacity-50 border-blue-800 rounded-md py-1 px-2 text-[color:var(--deals-primary)] ">
            Verify
          </button>
        </div>
      )}
    </div>
  );
}

export default BusinessCenterPageHeader;
