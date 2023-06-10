import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function MarketFormOne({ marketPostType, handleChangeMarketPostType }) {
	return (
		<form className="p-4">
			<h4 className="pt-4">Is this post for a product or service?</h4>
			<div className="mt-4">
				<RadioGroup
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
					value={marketPostType}
					onChange={handleChangeMarketPostType}
				>
					<FormControlLabel
						value="Product"
						control={<Radio className="flex justify-between" />}
						label="Product"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Service"
						control={<Radio />}
						label="Service"
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

export default MarketFormOne;
