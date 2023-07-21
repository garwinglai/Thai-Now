import React from "react";
import PostAmenities from "@/components/posts/PostAmenities";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostProfile from "@/components/posts/PostProfile";
import Image from "next/image";
import complete_post from "@/public/static/images/complete_post.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import CustomModal from "@/components/layouts/CustomModal";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AboutBusiness from "../AboutBusiness";

function MarketFormFive({
  isBusinessUser,
  marketPostType,
  productDetails,
  isProductPhysical,
  productCondition,
  uploadedPhotos,
  priceOption,
  offerPrice,
  offerIncludesTax,
  isPublish,
  closeModal,
}) {
  const { title, description, location } = productDetails;
  const marketValues = {
    marketPostType,
    isProductPhysical,
    productCondition,
    priceOption,
    offerPrice,
    offerIncludesTax,
  };
  return (
    <form className="w-full lg:w-9/12 lg:mx-auto">
      <h4 className="pt-4 px-4">Finish up and publish.</h4>
      <div className="lg:flex lg:justify-between">
        <h3 className="text-[color:var(--deals-primary)] font-normal px-4 py-2">
          {title}
        </h3>
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
              <FileUploadOutlinedIcon sx={{ color: "var(--deals-primary)" }} />
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
          src={uploadedPhotos[0].imgUrl}
          alt={uploadedPhotos[0].fileName}
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
      <div className="flex flex-col gap-[1px] bg-[color:var(--border)] lg:flex-row-reverse lg:gap-4 lg:bg-white lg:pt-4">
        <div className="lg:w-1/3 lg:border lg:h-fit lg:rounded-md lg:shadow-sm ">
          <div className="lg:mx-4 lg:border-b">
            <PostProfile isCreatePostDesktop={true} />
          </div>
          <div className="hidden lg:block lg:mx-4 lg:py-4">
            <AboutBusiness isBusinessUser={isBusinessUser} />
          </div>

          <PostContactInfo isClassicUser={true} />
        </div>
        <div className="lg:w-2/3">
          <PostOfferOptions postType="marketplace" values={marketValues} />
          <PostDescription description={description} isLoggedIn={true} />
          <PostLocation location={location} />
        </div>
      </div>
      <CustomModal isPublish={isPublish} onClose={closeModal}>
        <div className="flex flex-col items-center text-center gap-4">
          <Image src={complete_post} alt="complete post image" />
          <h4>Complete</h4>
          <p className="font-light">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officiis
            laborum labore quaerat beatae similique.
          </p>
          <PrimaryButton name="View your Post" />
          <Link
            href={` ${
              isBusinessUser
                ? "/business-center/business"
                : "/business-center/classic"
            } `}
            className="underline font-light text-[color:var(--deals-primary)] "
          >
            Go to Business Center
          </Link>
        </div>
      </CustomModal>
    </form>
  );
}

export default MarketFormFive;
