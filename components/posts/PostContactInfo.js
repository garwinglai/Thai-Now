import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";

function PostContactInfo({
  isBusinessUser,
  userData,
  postType,
  jobContactMethodEmail,
  jobContactMethodInPerson,
  jobContactMethodPhone,
}) {
  const {
    email,
    fName,
    lName,
    profPic,
    phoneNum,
    reviewScore,
    numReviews,
    fullAddress,
  } = userData ? userData : {};

  return (
    <div className="p-4 bg-white">
      <h5>Business Contact</h5>
      <div
        className={`flex justify-between py-4 lg:px-0 lg:pt-0 lg:pb-4 lg:flex-col-reverse  ${
          !isBusinessUser ? "px-8" : "px-2"
        } lg:flex-col `}
      >
        {postType !== 0 ? (
          <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
            <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
              {phoneNum}
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
        ) : (
          jobContactMethodPhone && (
            <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
              <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
                {phoneNum}
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
          )
        )}
        {postType !== 0 ? (
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
        ) : (
          jobContactMethodEmail && (
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
          )
        )}
        {isBusinessUser && (
          <React.Fragment>
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
            {postType !== 0 ? (
              <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
                <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
                  {fullAddress}
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
            ) : (
              jobContactMethodInPerson && (
                <span className="flex flex-col items-center gap-1 lg:flex-row lg:justify-between lg:border-b lg:py-2">
                  <p className="hidden lg:block text-[color:var(--deals-primary)] font-light text-sm ">
                    {fullAddress}
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
              )
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default PostContactInfo;
