import React from "react";
import { TextField } from "@mui/material";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

function EditProfile() {
  return (
    <React.Fragment>
      <h2 className="text-center my-4 lg:text-left lg:mb-0">Personal info</h2>
      <p className="hidden lg:block lg:font-extralight lg:mb-6">
        People visitng your profile will see the following info
      </p>
      <div className="relative mb-12">
        <Image
          className="mx-auto lg:ml-0 lg:w-28 lg:h-28"
          src={avatar_image}
          alt="profile image"
        />

        <button className="flex items-center gap-1 absolute left-1/2 bottom-[-20px] bg-white rounded-full py-2 px-4 shadow-md -translate-x-1/2 lg:left-[3.5rem] lg:py-1 lg:px-2 lg:bottom-[-10px]">
          <CameraAltOutlinedIcon fontSize="extra small" />
          <p className="font-light text-gray-400 lg:text-xs lg:text-gray-900">
            Edit
          </p>
        </button>
      </div>
      <form className="flex flex-col gap-8">
        <TextField
          required
          id="first-name"
          label="First name"
          fullWidth
          type="text"
          defaultValue="Hello World"
          color="warning"
          size="small"
        />
        <TextField
          required
          id="last-name"
          label="Last name"
          fullWidth
          type="text"
          color="warning"
          size="small"
        />
        <TextField
          required
          id="phone-number"
          label="Phone number"
          fullWidth
          type="number"
          color="warning"
          size="small"
        />
        <TextField
          required
          id="email"
          label="Email"
          fullWidth
          type="email"
          color="warning"
          size="small"
        />
        <TextField
          required
          id="location"
          label="Location"
          fullWidth
          type="text"
          color="warning"
          size="small"
        />
        <button className="bg-[color:var(--secondary)] text-white py-3 rounded text-sm">
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default EditProfile;
