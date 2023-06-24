import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function FilteredBy() {
	return (
		<div className="p-4">
			<h4 className="mb-4 text-base">Filtered By</h4>
			<div className="flex gap-2 items-center border rounded w-fit px-1">
				<p className="text-sm font-extralight">$100 -300</p>
				<CloseIcon sx={{ fontSize: "0.75rem" }} />
			</div>
			<button className="font-extralight text-sm underline text-[color:var(--deals-primary)] mt-4">
				Clear all
			</button>
		</div>
	);
}

export default FilteredBy;
