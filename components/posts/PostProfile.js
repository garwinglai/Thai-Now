import React, { useState } from "react";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

function PostProfile({ isPublicPage, isCreatePostDesktop, userData, city }) {
  const { email, fName, lName, profPic, name } = userData ? userData : {};

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div className="p-4 bg-white lg:px-0">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-3 mb-2">
          {profPic && (
            <div className="relative w-16 h-16 aspect-square">
              <Image
                src={profPic["0-1"]}
                alt="profile image"
                fill
                className="border-4 border-[color:var(--label-color)] rounded-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <h4 className=" text-lg">
            Hosted by {name ? name : `${fName} ${lName}`}
          </h4>
        </span>
        {isPublicPage && (
          <React.Fragment>
            <button
              onClick={toggleDrawer("bottom", true)}
              className="text-[color:var(--deals-primary)] border border-[color:var(--deals-primary-med)] h-fit py-1 px-2 rounded"
            >
              Setting
            </button>
            <Drawer
              anchor={"bottom"}
              open={state["bottom"]}
              onClose={toggleDrawer("bottom", false)}
            >
              <div>
                <div className="text-center p-4 border-b border-[color:#f6f4f0] relative">
                  <h4 className=" font-normal ">Setting your business</h4>
                  <div className="absolute right-2 top-3">
                    <IconButton onClick={toggleDrawer("bottom", false)}>
                      <CloseIcon sx={{ color: "black" }} />
                    </IconButton>
                  </div>
                </div>
                <div className="flex flex-col gap-4 px-4 py-8">
                  <Link href="/profile/business" className="font-light">
                    Edit Shop Profile
                  </Link>
                  <Link href="/business-center/business" className="font-light">
                    Create your post
                  </Link>
                </div>
              </div>
            </Drawer>
          </React.Fragment>
        )}
      </div>
      <div className="flex justify-between w-full">
        <span className="flex items-center overflow-hidden whitespace-nowrap  ">
          <StarOutlinedIcon sx={{ color: "rgba(251, 197, 4, 1)" }} />
          <p className="font-extralight text-sm text-ellipsis overflow-hidden whitespace-nowrap">
            <span className="font-light">0 </span>
            (0 Reviews) {city ? `- ${city}` : ""}
          </p>
        </span>

        <span className={`flex lg:gap-2 ${isCreatePostDesktop && "lg:hidden"}`}>
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
          {!isPublicPage && (
            <IconButton>
              <MoreHorizOutlinedIcon sx={{ color: "var(--deals-primary)" }} />
            </IconButton>
          )}
        </span>
      </div>
    </div>
  );
}

export default PostProfile;
