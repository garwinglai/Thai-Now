import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { IconButton } from "@mui/material";

function RecentSearch() {
	return (
		<div className="p-4 border my-4">
			<div className="flex justify-between">
				<p className="text-sm">Recent searches</p>
				<button className="underline font-extralight text-sm text-[color:var(--deals-primary)]">
					Clear all
				</button>
			</div>
			<div className="mt-4">
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-2">
						<AccessTimeOutlinedIcon fontSize="small" />
						<p className="text-sm font-extralight">Restaurant</p>
					</span>
					<IconButton>
						<CloseOutlinedIcon fontSize="small" />
					</IconButton>
				</div>
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-2">
						<AccessTimeOutlinedIcon fontSize="small" />
						<p className="text-sm font-extralight">Spa</p>
					</span>
					<IconButton>
						<CloseOutlinedIcon fontSize="small" />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

export default RecentSearch;
