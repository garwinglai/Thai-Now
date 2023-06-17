import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Drawer } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";

import { IconButton } from "@mui/material";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SortSearchResults from "@/components/directories/filters/SortSearchResults";

function SearchFilters() {
	const [serviceDrawerOpen, setServiceDrawerOpen] = useState({
		bottom: false,
	});
	const [openSortDrawer, setOpenSortDrawer] = useState(false);

	const toggleDrawerService = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setServiceDrawerOpen({ ...serviceDrawerOpen, [anchor]: open });
	};

	const toggleDrawerPostedDate = (open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenSortDrawer(open);
	};

	function openDrawerServiceDisplay() {
		return (
			<Drawer
				anchor={"bottom"}
				open={serviceDrawerOpen["bottom"]}
				onClose={toggleDrawerService("bottom", false)}
			>
				<div>
					<div className="text-center p-4 border-b">
						<h4>Service</h4>
						<div className="absolute right-4 top-3">
							<IconButton onClick={toggleDrawerService("bottom", false)}>
								<CloseIcon fontSize="small" />
							</IconButton>
						</div>
					</div>
					<FormControl sx={{ width: "100%", padding: "30px 30px 30px 10px" }}>
						<RadioGroup
							aria-labelledby="demo-radio-buttons-group-label"
							defaultValue="jobs"
							name="radio-buttons-group"
						>
							<FormControlLabel
								value="jobs"
								control={<Radio />}
								label="Jobs"
								labelPlacement="start"
								sx={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
									color: "#717171",
								}}
							/>
							<FormControlLabel
								value="housing"
								control={<Radio />}
								label="Housing"
								labelPlacement="start"
								sx={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
									color: "#717171",
								}}
							/>
							<FormControlLabel
								value="marketplace"
								control={<Radio />}
								label="Marketplace"
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
					<div className="p-4">
						<PrimaryButton name="Apply" />
					</div>
				</div>
			</Drawer>
		);
	}

	function openSortDrawerDisplay() {
		return (
			<Drawer
				anchor={"bottom"}
				open={openSortDrawer}
				onClose={toggleDrawerPostedDate(false)}
			>
				<SortSearchResults closeDrawer={toggleDrawerPostedDate} />
			</Drawer>
		);
	}

	return (
		<div className="flex gap-4 px-4 py-3 border my-2 border-b-4 border-[color:var(--border)]">
			<button
				onClick={toggleDrawerService("bottom", true)}
				className="flex items-center text-[color:var(--deals-primary)] rounded-full bg-[color:var(--filter-bg)] px-2 py-1 text-xs font-light"
			>
				Jobs
				<KeyboardArrowDownIcon fontSize="small" />
			</button>
			{openDrawerServiceDisplay()}
			<button
				onClick={toggleDrawerPostedDate(true)}
				className="flex gap-2 items-center text-[color:var(--deals-primary)] rounded-full bg-[color:var(--filter-bg)] px-2 py-1 text-xs font-extralight"
			>
				<SortIcon fontSize="small" />
				Posted Date
			</button>
			{openSortDrawerDisplay()}
			<button className="flex gap-2 items-center text-[color:var(--deals-primary)] rounded-full bg-[color:var(--filter-bg)] px-2 py-1 text-xs font-light">
				<TuneIcon fontSize="small" />
				Filter
			</button>
		</div>
	);
}

export default SearchFilters;
