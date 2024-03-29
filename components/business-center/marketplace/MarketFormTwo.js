import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton } from "@mui/material";

function MarketFormTwo({
  productDetails,
  handleProductValueChange,
  handlePhotoFileChange,
  uploadedPhotos,
  handleRemoveImage,
}) {
  const {
    postTitle,
    postDescription,
    location,
    productType,
    addy1,
    addy2,
    city,
    state,
    zip,
  } = productDetails;

  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Tell us about your Product.</h4>
      <label
        htmlFor="post-title"
        className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
      >
        Title <span className="text-[color:var(--secondary)] ">* </span>
      </label>
      <input
        type="text"
        name="postTitle"
        id="postTitle"
        value={postTitle}
        onChange={handleProductValueChange}
        className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-2 py-2 "
      />{" "}
      <div className="mt-4">
        <label
          htmlFor="productType"
          className=" text-[color:var(--deals-primary)] pt-6 pb-2 "
        >
          Select the product type
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>

        <RadioGroup
          aria-labelledby="product-type-radio-group"
          name="productType"
          value={productType}
          onChange={handleProductValueChange}
        >
          <FormControlLabel
            value="Food"
            control={<Radio className="flex justify-between" />}
            label="Food"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Handmade"
            control={<Radio />}
            label="Handmade"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Vehicles"
            control={<Radio />}
            label="Vehicles"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Home & Garden"
            control={<Radio />}
            label="Home & Garden"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Freelance"
            control={<Radio />}
            label="Freelance"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Handyman"
            control={<Radio />}
            label="Handyman"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Taxi"
            control={<Radio />}
            label="Taxi"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
        </RadioGroup>
      </div>
      <h5 className=" text-[color:var(--deals-primary)] pt-4 pb-2 ">
        Upload your photo{" "}
        <span className="text-[color:var(--secondary)] ">* </span>
      </h5>
      <label htmlFor="photos" className="hover:cursor-pointer">
        <input
          type="file"
          name="photos"
          id="photos"
          value=""
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
          {uploadedPhotos.map((file, idx) => {
            const { imgUrl, fileName } = file;
            return (
              <div
                key={idx}
                className=" w-14 h-14 relative flex items-center justify-center lg:w-16 lg:h-16"
              >
                <Image
                  src={imgUrl}
                  alt={fileName}
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
                    <IconButton onClick={handleRemoveImage(imgUrl, fileName)}>
                      <DeleteForeverOutlinedIcon
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="text-[color:var(--label-color)]  text-sm pt-2 ">
        <span className="text-[color:var(--secondary)] ">* </span>
        Recommended photos: 11
      </p>{" "}
      <h5 className=" text-[color:var(--deals-primary)] pt-6 pb-2 ">
        Promotion Description{" "}
        <span className="text-[color:var(--secondary)] ">* </span>
      </h5>
      <textarea
        value={postDescription}
        onChange={handleProductValueChange}
        name="postDescription"
        id="postDescription"
        rows="5"
        className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
      />
      <p className=" text-gray-400 text-sm font-light ">150/500</p>
      <h5 className=" text-[color:var(--deals-primary)] pt-6 pb-2 ">
        Location <span className="text-[color:var(--secondary)] ">* </span>
      </h5>
      <div className="w-full relative flex flex-col gap-2">
        {/* <i className="absolute top-1 left-2">
          <FmdGoodOutlinedIcon />
        </i> */}
        <input
          value={addy1}
          onChange={handleProductValueChange}
          name="addy1"
          type="text"
          placeholder="address 1"
          className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full  py-2 "
        />
        <input
          value={addy2}
          onChange={handleProductValueChange}
          name="addy2"
          type="text"
          placeholder="address 2"
          className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full  py-2 "
        />
        <div className="flex gap-2">
          <input
            value={city}
            onChange={handleProductValueChange}
            name="city"
            type="text"
            placeholder="city"
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full  py-2 "
          />
          <input
            value={state}
            onChange={handleProductValueChange}
            name="state"
            type="text"
            maxLength={2}
            placeholder="state"
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full  py-2 "
          />
          <input
            value={zip}
            onChange={handleProductValueChange}
            name="zip"
            type="text"
            placeholder="zip"
            className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full  py-2 "
          />
        </div>
      </div>
    </form>
  );
}

export default MarketFormTwo;
