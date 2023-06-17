import * as React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FilterSortButtonGroup from "./FilterSortButtonGroup";

export default function SortSearchResults({ closeDrawer }) {
	return (
		<div className="">
			<div className="text-center p-4">
				<h4>Sort by</h4>
				<div className="absolute right-4 top-3">
					<IconButton onClick={closeDrawer(false)}>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</div>
			</div>
			<div className="border">
				<FormControl sx={{ width: "100%", padding: "30px 30px 30px 10px" }}>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="posted date"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="posted date"
							control={<Radio />}
							label="Posted Date"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="highest rated"
							control={<Radio />}
							label="Highest Rated"
							labelPlacement="start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								width: "100%",
								color: "#717171",
							}}
						/>
						<FormControlLabel
							value="most reviewed"
							control={<Radio />}
							label="Most Reviewed"
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
			<FilterSortButtonGroup />
		</div>
	);
}
