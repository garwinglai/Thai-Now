import React, { useEffect, useState } from "react";
import temp_image from "@/public/static/images/business_temp_img.png";
import Image from "next/image";
import PostProfile from "@/components/posts/PostProfile";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import RecommendedPosts from "./RecommendedPosts";
import PostReview from "./reviews/PostReview";
import AboutBusiness from "@/components/business-center/AboutBusiness";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import Skeleton from "@mui/material/Skeleton";
import PostAmenities from "@/components/posts/PostAmenities";

function HousingPostDetail({ postData, userData, authUser, pid }) {
  const isLoggedIn = true;

  const { email, fName, lName, profileImgUrl } = userData ? userData : {};

  const {
    postTitle,
    postDescription,
    postAddressDetails,
    postAddress,
    photos,
    amenitiesDisplay,
    userId,
    id,
  } = postData ? postData : {};

  const { city } = postAddressDetails ? postAddressDetails : {};

  const [defaultImage, setDefaultImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (photos) {
      setIsLoading(true);
      // loop through photos object to find the first photo
      for (const key in photos) {
        if (photos.hasOwnProperty(key)) {
          const defaultImage = photos[key];
          setDefaultImage(defaultImage);
          break;
        }
      }
      setIsLoading(false);
    }
  }, [photos]);

  return (
    <div>
      <div className=" w-full lg:w-9/12 lg:mx-auto">
        <div className="lg:flex lg:justify-between">
          <h4 className="px-4 text-[color:var(--deals-primary)] lg:px-0">
            {postTitle}
          </h4>
          <span className={`flex lg:gap-2`}>
            <div className="flex items-center">
              <IconButton>
                <StarOutlineOutlinedIcon
                  sx={{ color: "var(--deals-primary)" }}
                  fontSize="small"
                />
              </IconButton>
              <button className=" text-sm font-light text-[color:var(--deals-primary)] underline">
                Save
              </button>
            </div>
            <div className="flex items-center">
              <IconButton>
                <FileUploadOutlinedIcon
                  sx={{ color: "var(--deals-primary)" }}
                />
              </IconButton>
              <button className=" text-sm font-light text-[color:var(--deals-primary)] underline">
                Share
              </button>
            </div>
            <div className="flex items-center">
              <IconButton>
                <OutlinedFlagSharpIcon sx={{ color: "var(--deals-primary)" }} />
              </IconButton>
              <button className=" text-sm font-light text-[color:var(--deals-primary)] underline">
                Report
              </button>
            </div>
          </span>
        </div>
        {!defaultImage ? (
          <div className="relative w-full h-80 inline-block">
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "20rem" }}
            />
          </div>
        ) : (
          <div className="relative w-full h-80 inline-block">
            <div className="relative w-full h-full">
              <Image
                priority
                src={defaultImage}
                alt="banner image"
                fill
                className="object-cover rounded"
              />
            </div>
            <button
              type="button"
              className="absolute z-10 bg-opacity-50 bg-black text-white border border-white rounded px-4 py-2 right-4 bottom-4 "
            >
              + 20 Photos
            </button>
          </div>
        )}

        <div className="flex flex-col gap-[1px] bg-[color:var(--border)] lg:flex-row-reverse lg:bg-white lg:pt-4 lg:gap-4">
          <div className="lg:w-1/3 lg:border lg:h-fit lg:rounded-md lg:shadow-sm ">
            <div className="lg:mx-4 lg:border-b">
              <PostProfile
                isCreatePostDesktop={true}
                userData={userData}
                city={city}
              />
            </div>
            <div className="hidden lg:block lg:mx-4 lg:py-4">
              <AboutBusiness isBusinessUser={true} />
            </div>
            <PostContactInfo userData={userData} />
          </div>
          <div className="lg:w-2/3">
            <PostOfferOptions postType="housing" postData={postData} />
            <PostDescription
              description={postDescription}
              authUser={authUser}
            />
            {amenitiesDisplay && <PostAmenities amenities={amenitiesDisplay} />}
            {authUser && <PostLocation location={postAddress} />}
            <PostReview userId={userId} pid={pid} />
            {/* <span className="h-32 bg-white"></span> */}
          </div>
        </div>
      </div>
      <RecommendedPosts postType="Housing" />
    </div>
  );
}

export default HousingPostDetail;
