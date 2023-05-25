import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Divider from "@mui/material/Divider";

function RadioCategory({ category }) {
	return (
		<React.Fragment>
			<FormControlLabel
				value={category}
				control={<Radio />}
				label={category}
				labelPlacement="start"
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					color: "#717171",
					padding: "0.25rem 0",
					"& .MuiSvgIcon-root": {
						fontSize: 20,
					},
				}}
			/>
			<Divider />
		</React.Fragment>
	);
}

export default RadioCategory;
