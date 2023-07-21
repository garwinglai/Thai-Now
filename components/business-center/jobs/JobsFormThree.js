import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function JobsFormThree({
  handleJobValueChange,
  jobValues,
  handleHasJobVisaChange,
  hasJobVisa,
}) {
  const { workExperience, skills } = jobValues;
  console.log(skills);

  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">Job qualifications</h4>
      <div className="mt-4">
        <label
          htmlFor="workExperience"
          className=" text-[color:var(--deals-primary)] pt-6 pb-4 "
        >
          Work experience
          <span className="text-[color:var(--secondary)] ">* </span>
        </label>

        <RadioGroup
          aria-labelledby="work-experience-radio-group"
          name="workExperience"
          sx={{ marginTop: "1rem" }}
          value={workExperience}
          onChange={handleJobValueChange}
        >
          <FormControlLabel
            value="No experience"
            control={<Radio className="flex justify-between" />}
            label="No experience"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="1-2 years"
            control={<Radio />}
            label="1-2 years"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="3-5 years"
            control={<Radio />}
            label="3-5 years"
            labelPlacement="start"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#717171",
              marginLeft: "0",
            }}
          />
          <FormControlLabel
            value="+5 years"
            control={<Radio />}
            label="+5 years"
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
      <label
        htmlFor="title"
        className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
      >
        Skills{" "}
        <span className="text-[color:var(--deals-primary)] font-extralight text-sm">
          (Optional)
        </span>
      </label>
      <input
        type="text"
        name="skills"
        id="skills"
        placeholder="customer service, good memory, etc"
        value={skills}
        onChange={handleJobValueChange}
        className=" placeholder:font-light placeholder:text-sm rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
      />{" "}
      <div className="mt-2">
        <p className="block text-[color:var(--deals-primary)] pt-4 pb-2 ">
          This job position supports Visa sponsorship (US only){" "}
          <span className="text-[color:var(--deals-primary)] font-extralight text-sm">
            (Optional)
          </span>{" "}
        </p>
        <FormControlLabel
          value="Yes"
          control={
            <Checkbox checked={hasJobVisa} onChange={handleHasJobVisaChange} />
          }
          label="Yes"
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#717171",
            marginLeft: "0",
          }}
        />
      </div>
    </form>
  );
}

export default JobsFormThree;
