import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBarMobile({ handleClick }) {
	return (
		<button
			onClick={handleClick}
			className="absolute w-full -bottom-6 px-4 hover:cursor-text"
		>
			<div className="bg-[color:var(--input-bg-secondary)] rounded flex items-center gap-2 py-4 shadow-lg pl-4">
				<SearchIcon fontSize="small" sx={{ color: "var(--label-color)" }} />
				<p className="font-light text-sm text-[color:var(--label-color)] ">
					Search for Deals, Jobs, House ...
				</p>
			</div>
		</button>
	);
}

export default SearchBarMobile;
