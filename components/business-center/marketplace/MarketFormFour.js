import React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

function MarketFormFour({
  handlePriceOption,
  priceOption,
  handleTaxChange,
  offerIncludesTax,
  handleChangePrice,
  offerPrice,
}) {
  const { exactPrice, priceRange } = offerPrice;

  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Product / Service Price Information.</h4>
      <h5 className=" text-[color:var(--deals-primary)] py-4">
        Price
        <span className="text-[color:var(--secondary)] "> * </span>{" "}
      </h5>
      <FormControl className="w-full ">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          className="flex flex-col gap-2 "
          value={priceOption}
          onChange={handlePriceOption}
        >
          <div>
            <div>
              <FormControlLabel
                value="exact"
                control={<Radio />}
                label={
                  <p className=" text-[color:var(--label-color)] font-extralight pr ">
                    Exact Price
                  </p>
                }
                labelPlacement="start"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "0",
                }}
              />
            </div>
            <div
              className={`${
                priceOption === "exact"
                  ? " transition-opacity duration-300 h-auto opacity-100 flex gap-4 w-full"
                  : " h-0 opacity-0"
              }`}
            >
              <div className="relative flex-grow">
                <i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
                  $
                </i>
                <input
                  type="number"
                  name="price"
                  value={exactPrice.price}
                  onChange={handleChangePrice}
                  id="post-title"
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full "
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <FormControlLabel
                value="range"
                control={<Radio />}
                label={
                  <p className=" text-[color:var(--label-color)] font-extralight ">
                    Price Range
                  </p>
                }
                labelPlacement="start"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "0",
                }}
              />
            </div>
            <div
              className={`${
                priceOption === "range"
                  ? " transition-opacity duration-300 h-auto opacity-100 flex items-center gap-4 w-full"
                  : " h-0 opacity-0"
              }`}
            >
              <div className="relative flex-grow">
                <i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
                  $
                </i>
                <input
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  value={priceRange.minPrice}
                  onChange={handleChangePrice}
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full "
                />
              </div>
              <span className="text-[color:var(--deals-primary)]">-</span>
              <div className="relative flex-grow">
                <i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
                  $
                </i>
                <input
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  value={priceRange.maxPrice}
                  onChange={handleChangePrice}
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full "
                />
              </div>
            </div>
          </div>
        </RadioGroup>
      </FormControl>
      <div className="mt-4">
        <label
          htmlFor="demo-controlled-radio-buttons-group"
          className=" text-[color:var(--deals-primary)] pt-6 pb-2 "
        >
          Does the price include tax?
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          sx={{ marginTop: "16px" }}
          value={offerIncludesTax}
          onChange={handleTaxChange}
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
    </form>
  );
}

export default MarketFormFour;
