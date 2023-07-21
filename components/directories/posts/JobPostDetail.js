import React from "react";
import temp_image from "@/public/static/images/business_temp_img.png";
import Image from "next/image";
import PostProfile from "@/components/posts/PostProfile";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import RecommendedPosts from "./RecommendedPosts";
import AboutBusiness from "@/components/business-center/AboutBusiness";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { IconButton } from "@mui/material";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";

function JobPostDetail() {
  const isLoggedIn = true;

  const values = {
    jobValues: {
      title: "Full-time",
      jobLocation: "On-site",
      experience: "No experience",
      skills: "Sales, communication",
    },
    salaryRange: {
      minPrice: "30",
      maxPrice: "35",
      interval: "Hour",
    },
    hasJobVisa: "No",
  };

  const description =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quibusdam, natus laborum aliquid laboriosam placeat. Minima dolores voluptates debitis voluptas quis voluptatibus iure fuga!";

  const location = "123 W Adams Blvd, Los Angeles";

  return (
    <div>
      <div className=" w-full lg:w-9/12 lg:mx-auto">
        <div className="lg:flex lg:justify-between">
          <h4 className="px-4 text-[color:var(--deals-primary)] lg:px-0">
            Title of the post is written here.
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
        <div className="relative w-full h-80 inline-block">
          <Image
            src={temp_image}
            alt="images of the post"
            fill={true}
            className=" object-cover "
          />
          <button
            type="button"
            className="absolute z-10 bg-opacity-50 bg-black text-white border border-white rounded px-4 py-2 right-4 bottom-4 "
          >
            + 20 Photos
          </button>
        </div>
        <div className="flex flex-col gap-[1px] bg-[color:var(--border)] lg:flex-row-reverse lg:bg-white lg:pt-4 lg:gap-4">
          <div className="lg:w-1/3 lg:border lg:h-fit lg:rounded-md lg:shadow-sm ">
            <div className="lg:mx-4 lg:border-b">
              <PostProfile isCreatePostDesktop={true} />
            </div>
            <div className="hidden lg:block lg:mx-4 lg:py-4">
              <AboutBusiness isBusinessUser={true} />
            </div>
            <PostContactInfo />
          </div>
          <div className="lg:w-2/3">
            <PostOfferOptions postType="jobs" values={values} />
            <PostDescription
              description={description}
              isLoggedIn={isLoggedIn}
            />
            {isLoggedIn && <PostLocation location={location} />}
            <span></span>
          </div>
        </div>
      </div>

      <RecommendedPosts postType="Jobs" />
    </div>
  );
}

export default JobPostDetail;
