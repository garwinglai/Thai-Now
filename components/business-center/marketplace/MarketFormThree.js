import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function MarketFormThree({
  isProductPhysical,
  handleProductPhysicalChange,
  productCondition,
  handleProductCondition,
}) {
  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Specification</h4>
      <div className="mt-4">
        <label
          htmlFor="demo-controlled-radio-buttons-group"
          className=" text-[color:var(--deals-primary)] pt-6 pb-2 "
        >
          Is this a physical product?
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={isProductPhysical}
          onChange={handleProductPhysicalChange}
        >
          <FormControlLabel
            value="Yes"
            control={<Radio className="flex justify-between" />}
            label="Yes"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="No"
            control={<Radio />}
            label="No"
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
      <div className="mt-4">
        <label
          htmlFor="demo-controlled-radio-buttons-group"
          className=" text-[color:var(--deals-primary)] pt-6 pb-2 "
        >
          Condition
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={productCondition}
          onChange={handleProductCondition}
        >
          <FormControlLabel
            value="Used"
            control={<Radio className="flex justify-between" />}
            label="Used"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="New"
            control={<Radio />}
            label="New"
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
    </form>
  );
}

export default MarketFormThree;
