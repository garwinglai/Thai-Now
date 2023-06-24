import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function DistanceFilter() {
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
							value="0.5mi"
							control={<Radio />}
							label="< 0.5 mi"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3mi"
							control={<Radio />}
							label="< 3 mi"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="5mi"
							control={<Radio />}
							label="< 5 mi"
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
							value="0.5mi"
							control={<Radio />}
							label={<p className="font-light text-sm">{`< 0.5 mi`}</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="3mi"
							control={<Radio />}
							label={<p className="font-light text-sm">{`< 3 mi`}</p>}
							labelPlacement="end"
							sx={{
								paddingLeft: "1rem",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="5mi"
							control={<Radio />}
							label={<p className="font-light text-sm">{`< 5 mi`}</p>}
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
			<h4 className="mb-2 lg:text-base">Distance</h4>
			{displayMobile()}
			{displayDesktop()}
		</div>
	);
}

export default DistanceFilter;
