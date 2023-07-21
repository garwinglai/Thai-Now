import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

function HousingFormThree({
  housingPrice,
  handlePriceOption,
  priceOption,
  handleChangePrice,
}) {
  const { exactPrice, priceRange } = housingPrice;
  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Housing Price Information</h4>
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
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full border-none"
                />
              </div>
              <div>
                <select
                  name="interval"
                  onChange={handleChangePrice}
                  id="interval"
                  value={exactPrice.interval}
                  className="border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-24 p-2 h-full "
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
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
                  ? " transition-opacity duration-300 h-full opacity-100 flex items-center gap-4 w-full"
                  : " h-0 opacity-0"
              }`}
            >
              <div className="relative">
                <i className="absolute top-2 left-4  text-[color:var(--deals-primary)]">
                  $
                </i>
                <input
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  value={priceRange.minPrice}
                  onChange={handleChangePrice}
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full border-none"
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
                  className="pl-4 rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-3 h-full border-none"
                />
              </div>

              <select
                name="interval"
                id="interval"
                value={priceRange.interval}
                onChange={handleChangePrice}
                className="block border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-28"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
            </div>
          </div>
        </RadioGroup>
      </FormControl>
    </form>
  );
}

export default HousingFormThree;
