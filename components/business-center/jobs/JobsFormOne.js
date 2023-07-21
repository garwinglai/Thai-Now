import React from "react";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Image from "next/image";
import { IconButton } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

function JobsFormOne({
  handlePhotoFileChange,
  uploadedPhotos,
  handleJobValueChange,
  jobValues,
}) {
  const { title, description } = jobValues;

  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Tell us about your job.</h4>
      <label
        htmlFor="title"
        className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
      >
        Job Title <span className="text-[color:var(--secondary)] ">* </span>
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={handleJobValueChange}
        className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
      />
      <h5 className=" text-[color:var(--deals-primary)] pt-4 pb-2 ">
        Upload your photo{" "}
        <span className="text-[color:var(--secondary)] ">* </span>
      </h5>
      <label htmlFor="photos" className="hover:cursor-pointer">
        <input
          type="file"
          name="photos"
          id="photos"
          className="hidden"
          onChange={handlePhotoFileChange}
        />
        <span className="flex flex-col items-center gap-4 bg-[color:var(--input-bg-secondary)] rounded py-4">
          <p className="text-[color:var(--label-color)]">
            Click to upload photos
          </p>
          <div className="bg-white rounded-full p-4">
            <PhotoSizeSelectActualIcon sx={{ color: "var(--label-color)" }} />
          </div>
          <p className="text-[color:var(--label-color)]">Image</p>
        </span>
      </label>
      {uploadedPhotos.length !== 0 && (
        <div className="flex w-full gap-4 pt-4">
          {uploadedPhotos.map((file, idx) => (
            <div
              key={idx}
              className=" w-14 h-14 relative flex items-center justify-center lg:w-16 lg:h-16"
            >
              <Image
                src={file.imgUrl}
                alt={file.fileName}
                fill={true}
                className=" object-cover w-full rounded"
              />
              <div className="absolute opacity-0 flex  h-full items-end justify-center hover:opacity-70 ">
                <div className="bg-black h-2/5 flex justify-center items-center rounded-b lg:h-1/3">
                  <IconButton>
                    <RemoveRedEyeOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: "white",
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    <DeleteForeverOutlinedIcon
                      fontSize="small"
                      sx={{ color: "white" }}
                    />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-[color:var(--label-color)]  text-sm pt-2 ">
        <span className="text-[color:var(--secondary)] ">* </span>
        Recommended photos: 11
      </p>
      <h5 className=" text-[color:var(--deals-primary)] pt-6 pb-2 ">
        Job Description{" "}
        <span className="text-[color:var(--secondary)] ">* </span>
      </h5>
      <textarea
        value={description}
        onChange={handleJobValueChange}
        name="description"
        id="description"
        rows="5"
        className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
      />
    </form>
  );
}

export default JobsFormOne;
