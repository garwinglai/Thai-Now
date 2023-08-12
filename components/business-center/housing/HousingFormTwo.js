import React, { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

function HousingFormTwo({
  handleMinusCount,
  handlePlusCount,
  handleAmenitiesChange,
  guestCount,
  bedroomCount,
  parkingCount,
  bathroomCount,
  amenities,
}) {
  const {
    kitchen,
    wifi,
    tv,
    washer,
    hairDryer,
    refridgerator,
    microwave,
    workspace,
    dryer,
    smokeAlarm,
    cookingBasics,
  } = amenities;

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <form ref={formRef} className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Tell guest what your place has to offer.</h4>
      <h5 className=" text-[color:var(--deals-primary)] py-4">
        How many guests are you looking for?
        <span className="text-[color:var(--secondary)] "> * </span>{" "}
      </h5>
      <div className="flex flex-col gap-4">
        <span className="flex justify-between items-center">
          <p className=" text-[color:var(--label-color)] font-extralight ">
            Guest(s)
          </p>
          <span className="flex gap-2 items-center">
            <div className="border rounded-full">
              <IconButton
                sx={{ backgroundColor: "var(--element-color)" }}
                name="minusCount"
                onClick={handleMinusCount("guestCount")}
              >
                <RemoveOutlinedIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </div>
            <input
              type="number"
              name="guestCount"
              id="guest"
              value={guestCount}
              readOnly
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] text-center w-12 focus:ring-0 border-none"
            />
            <div className="border rounded-full bg-[color:var(--deals-primary-med)]">
              <IconButton
                onClick={handlePlusCount("guestCount")}
                sx={{ backgroundColor: "var(--deal-primary-med)" }}
              >
                <AddOutlinedIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            </div>
          </span>
        </span>
        <span className="flex justify-between items-center">
          <p className=" text-[color:var(--label-color)] font-extralight ">
            Bedrooms
          </p>
          <span className="flex gap-2 items-center">
            <div className="border rounded-full">
              <IconButton
                sx={{ backgroundColor: "var(--element-color)" }}
                name="minusCount"
                onClick={handleMinusCount("bedroomCount")}
              >
                <RemoveOutlinedIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </div>
            <input
              type="number"
              name="bedroomCount"
              id="bedroom"
              value={bedroomCount}
              readOnly
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] text-center w-12 focus:ring-0 border-none"
            />
            <div className="border rounded-full bg-[color:var(--deals-primary-med)]">
              <IconButton
                sx={{ backgroundColor: "var(--deals-primary-med)" }}
                onClick={handlePlusCount("bedroomCount")}
              >
                <AddOutlinedIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            </div>
          </span>
        </span>
        <span className="flex justify-between items-center">
          <p className=" text-[color:var(--label-color)] font-extralight ">
            Parking
          </p>
          <span className="flex gap-2 items-center">
            <div className="border rounded-full">
              <IconButton
                sx={{ backgroundColor: "var(--element-color)" }}
                name="minusCount"
                onClick={handleMinusCount("parkingCount")}
              >
                <RemoveOutlinedIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </div>
            <input
              type="number"
              name="parkingCount"
              id="parking"
              value={parkingCount}
              readOnly
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] text-center w-12 focus:ring-0 border-none"
            />
            <div className="border rounded-full bg-[color:var(--deals-primary-med)]">
              <IconButton
                sx={{ backgroundColor: "var(--deals-primary-med)" }}
                onClick={handlePlusCount("parkingCount")}
              >
                <AddOutlinedIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            </div>
          </span>
        </span>
        <span className="flex justify-between items-center">
          <p className=" text-[color:var(--label-color)] font-extralight ">
            Bathrooms
          </p>
          <span className="flex gap-2 items-center">
            <div className="border rounded-full">
              <IconButton
                sx={{ backgroundColor: "var(--element-color)" }}
                name="minusCount"
                onClick={handleMinusCount("bathroomCount")}
              >
                <RemoveOutlinedIcon sx={{ color: "black" }} fontSize="small" />
              </IconButton>
            </div>
            <input
              type="number"
              name="bathroomCount"
              id="bathroom"
              value={bathroomCount}
              readOnly
              className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] text-center w-12 focus:ring-0 border-none"
            />
            <div className="border rounded-full bg-[color:var(--deals-primary-med)]">
              <IconButton
                sx={{ backgroundColor: "var(--deals-primary-med)" }}
                onClick={handlePlusCount("bathroomCount")}
              >
                <AddOutlinedIcon sx={{ color: "white" }} fontSize="small" />
              </IconButton>
            </div>
          </span>
        </span>
      </div>
      <h5 className=" text-[color:var(--deals-primary)] py-4">
        Select amenities.
        <span className="text-[color:var(--deals-primary)] font-extralight text-sm">
          {" "}
          (Optional)
        </span>
      </h5>
      <FormGroup sx={{ marginRight: "0.5rem" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={kitchen}
              onChange={handleAmenitiesChange}
              name="kitchen"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Kitchen
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={wifi}
              onChange={handleAmenitiesChange}
              name="wifi"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Wifi
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox checked={tv} onChange={handleAmenitiesChange} name="tv" />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              TV
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={washer}
              onChange={handleAmenitiesChange}
              name="washer"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Washer
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hairDryer}
              onChange={handleAmenitiesChange}
              name="hairDryer"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Hair Dryer
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={refridgerator}
              onChange={handleAmenitiesChange}
              name="refridgerator"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Refridgerator
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={microwave}
              onChange={handleAmenitiesChange}
              name="microwave"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Microwave
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={workspace}
              onChange={handleAmenitiesChange}
              name="workspace"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Workspace
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dryer}
              onChange={handleAmenitiesChange}
              name="dryer"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Dryer
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={smokeAlarm}
              onChange={handleAmenitiesChange}
              name="smokeAlarm"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Smoke Alarm
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cookingBasics}
              onChange={handleAmenitiesChange}
              name="cookingBasics"
            />
          }
          label={
            <p className=" text-[color:var(--label-color)] font-extralight ">
              Cooking Basics
            </p>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
      </FormGroup>
    </form>
  );
}

export default HousingFormTwo;
