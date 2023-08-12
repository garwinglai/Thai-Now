import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";

function PostContactInfo({ isClassicUser, userData }) {
  const { email, fName, lName, profileImgUrl } = userData ? userData : {};

  return (
    <div className="p-4 bg-white">
      <h5>Business Contact</h5>
      <div
        className={`flex justify-between py-4 lg:px-0 lg:pt-0 lg:pb-4 lg:flex-col-reverse  ${
          isClassicUser ? "px-8" : "px-2"
        } lg:flex-col `}
      >
        <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
          <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
            (312) 212-1212
          </p>
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <LocalPhoneIcon fontSize="small" />
            </IconButton>
          </span>
          <p className="text-sm font-light lg:hidden">Call</p>
        </span>
        <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
          <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
            {email}
          </p>
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </span>
          <p className="text-sm font-light lg:hidden">Email</p>
        </span>
        {!isClassicUser && (
          <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
            <Link
              href="https://thai-now.vercel.app/"
              className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm"
            >
              https://thai-now.vercel.app/
            </Link>
            <span>
              <IconButton
                sx={{
                  backgroundColor: "rgba(221, 221, 221, 1)",
                  color: "rgba(51, 51, 51, 1)",
                }}
              >
                <LanguageIcon fontSize="small" />
              </IconButton>
            </span>
            <p className="text-sm font-light lg:hidden">Website</p>
          </span>
        )}
        <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
          <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
            location
          </p>
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <MapOutlinedIcon fontSize="small" />
            </IconButton>
          </span>
          <p className="text-sm font-light lg:hidden">Map</p>
        </span>
      </div>
    </div>
  );
}

export default PostContactInfo;
