import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ handleOnChange, searchKeyword }) {
	return (
		<div className="px-4 relative">
			<div className="absolute top-[8px] left-7">
				<SearchIcon />
			</div>
			<input
				type="text"
				name="search"
				id="search"
				value={searchKeyword}
				onChange={handleOnChange}
				placeholder="Search for Deals, Foods, Jobs, House ..."
				className="bg-[color:var(--input-bg-secondary)] w-full rounded p-3 indent-8 text-sm font-light placeholder:text-xs placeholder:font-light"
			/>
		</div>
	);
}

export default SearchBar;
