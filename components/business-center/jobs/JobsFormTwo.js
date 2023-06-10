import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function JobsFormTwo({ handleJobValueChange, jobValues }) {
	const { jobType, jobLocation } = jobValues;

	return (
		<form className="p-4">
			<h4 className="pt-4">Type of job position</h4>
			<div className="mt-4">
				<label
					htmlFor="jobType"
					className=" text-[color:var(--deals-primary)] pt-6 pb-4 "
				>
					Job position
					<span className="text-[color:var(--secondary)] ">* </span>
				</label>

				<RadioGroup
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="jobType"
					sx={{ marginTop: "1rem" }}
					value={jobType}
					onChange={handleJobValueChange}
				>
					<FormControlLabel
						value="Full-time"
						control={<Radio className="flex justify-between" />}
						label="Full-time"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Part-time"
						control={<Radio />}
						label="Part-time"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Internship"
						control={<Radio />}
						label="Internship"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="On-demand"
						control={<Radio />}
						label="On-demand"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Seasonal"
						control={<Radio />}
						label="Seasonal"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Volunteer"
						control={<Radio />}
						label="Volunteer"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
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
						}}
					/>
				</RadioGroup>
			</div>
			<div className="mt-4">
				<label
					htmlFor="jobLocation"
					className=" text-[color:var(--deals-primary)] pt-6 pb-4 "
				>
					What kind of employees are you hiring?
					<span className="text-[color:var(--secondary)] ">* </span>
				</label>

				<RadioGroup
					aria-labelledby="job-location-radio-group"
					name="controlled-radio-buttons-group"
					sx={{ marginTop: "1rem" }}
					value={jobLocation}
					onChange={handleJobValueChange}
				>
					<FormControlLabel
						value="On-site"
						control={<Radio className="flex justify-between" />}
						label="On-site only"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Remote-accepted"
						control={<Radio />}
						label="Remote accepted"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Remote-only"
						control={<Radio />}
						label="Remote only"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
				</RadioGroup>
			</div>
		</form>
	);
}

export default JobsFormTwo;
