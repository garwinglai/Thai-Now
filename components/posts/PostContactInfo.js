import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { IconButton } from "@mui/material";

function PostContactInfo({ isClassicUser }) {
  return (
    <div className="p-4 bg-white">
      <h5>Business Contact</h5>
      <div
        className={`flex justify-between py-4  ${
          isClassicUser ? "px-8" : "px-2"
        }`}
      >
        <span className="flex flex-col items-center gap-1">
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <LocalPhoneIcon />
            </IconButton>
          </span>
          <p className="text-sm font-light">Call</p>
        </span>
        <span className="flex flex-col items-center gap-1">
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <EmailIcon />
            </IconButton>
          </span>
          <p className="text-sm font-light">Email</p>
        </span>
        {!isClassicUser && (
          <span className="flex flex-col items-center gap-1">
            <span>
              <IconButton
                sx={{
                  backgroundColor: "rgba(221, 221, 221, 1)",
                  color: "rgba(51, 51, 51, 1)",
                }}
              >
                <LanguageIcon />
              </IconButton>
            </span>
            <p className="text-sm font-light">Website</p>
          </span>
        )}
        <span className="flex flex-col items-center gap-1">
          <span>
            <IconButton
              sx={{
                backgroundColor: "rgba(221, 221, 221, 1)",
                color: "rgba(51, 51, 51, 1)",
              }}
            >
              <MapOutlinedIcon />
            </IconButton>
          </span>
          <p className="text-sm font-light">Map</p>
        </span>
      </div>
    </div>
  );
}

export default PostContactInfo;
