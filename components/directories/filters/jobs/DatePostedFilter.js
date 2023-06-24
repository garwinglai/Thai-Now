import React from "react";
import styles from "../../../../styles/components/directory/filters/jobs/date-posted-filter.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function DatePostedFilter() {
	function displayFormMobile() {
		return (
			<div className="lg:hidden">
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="any-time"
							control={<Radio />}
							label="Any Time"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="24-hours"
							control={<Radio />}
							label="Last 24 hours"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3-days"
							control={<Radio />}
							label="Last 3 days"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="7-days"
							control={<Radio />}
							label="Last 7 days"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="14-days"
							control={<Radio />}
							label="Last 14 days"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="30-days"
							control={<Radio />}
							label="Last 30 days"
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

	function displayFormDesktop() {
		return (
			<div className="hidden lg:block">
				<FormControl sx={{ width: "100%", marginLeft: "-16px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="hourly"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="any-time"
							control={<Radio />}
							label={<p className="font-light text-sm">Any Time</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="24-hours"
							control={<Radio />}
							label={<p className="font-light text-sm">Last 24 hours</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3-days"
							control={<Radio />}
							label={<p className="font-light text-sm">Last 3 days</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="7-days"
							control={<Radio />}
							label={<p className="font-light text-sm">Last 7 days</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="14-days"
							control={<Radio />}
							label={<p className="font-light text-sm">Last 14 days</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="30-days"
							control={<Radio />}
							label={<p className="font-light text-sm">Last 30 days</p>}
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
		<div className={`${styles.date_posted_filter_box}`}>
			<h4 className="lg:text-base">Date posted</h4>
			{displayFormMobile()}
			{displayFormDesktop()}
		</div>
	);
}

export default DatePostedFilter;
