import React from "react";
import SearchBarMobile from "@/components/search/SearchBarMobile";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SearchBar from "../SearchBar";

function SearchLocationBar({ handleOnChange, searchKeyword }) {
	return (
		<React.Fragment>
			<div className="px-4 relative mt-4">
				<div className="absolute top-[8px] left-7">
					<PlaceOutlinedIcon />
				</div>
				<input
					value={searchKeyword}
					onChange={handleOnChange}
					type="text"
					name="location"
					id="location"
					placeholder="Los Angeles"
					className="bg-[color:var(--input-bg-secondary)] w-full rounded p-3 indent-8 text-sm font-light placeholder:text-xs placeholder:font-light"
				/>
				<div className="absolute top-[8px] right-7">
					<HighlightOffIcon
						sx={{ color: "var(--label-color)" }}
						fontSize="small"
					/>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SearchLocationBar;
