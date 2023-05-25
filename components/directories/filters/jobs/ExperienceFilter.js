import React from "react";
import styles from "../../../../styles/components/directory/filters/jobs/experience-filter.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function ExperienceFilter() {
	return (
		<div className={`${styles.experience_filter_box}`}>
			<h4>Experience</h4>
			<div className={`${styles.radio_box}`}>
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
		</div>
	);
}

export default ExperienceFilter;
