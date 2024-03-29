import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function ExperienceFilter() {
	function displayMobile() {
		return (
			<div className="lg:hidden">
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="no-experience"
							control={<Radio />}
							label="No experience"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="1-2-years"
							control={<Radio />}
							label="1-2 years"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3-5-years"
							control={<Radio />}
							label="3-5 years"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="5-years"
							control={<Radio />}
							label="At least 5 years"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
					</RadioGroup>
				</FormControl>
			</div>
		);
	}

	function displayDesktop() {
		return (
			<div className="hidden lg:block">
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="no-experience"
							control={<Radio />}
							label={<p className="font-light text-sm">No experience</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="1-2-years"
							control={<Radio />}
							label={<p className="font-light text-sm">1-2 years</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3-5-years"
							control={<Radio />}
							label={<p className="font-light text-sm">3-5 years</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="5-years"
							control={<Radio />}
							label={<p className="font-light text-sm">At least 5 years</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
					</RadioGroup>
				</FormControl>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h4 className="mb-2 lg:text-base">Experience</h4>
			{displayMobile()}
			{displayDesktop()}
		</div>
	);
}

export default ExperienceFilter;
