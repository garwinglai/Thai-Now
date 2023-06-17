import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import SearchResultDisplay from "@/components/search/results/SearchResultDisplay";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/results/SearchFilters";
import SearchBarMobile from "@/components/search/SearchBarMobile";
import SearchIcon from "@mui/icons-material/Search";
import SearchDrawer from "@/components/search/page/SearchDrawer";

function Search({ keyword, service, location }) {
	const [isSearching, setIsSearching] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState(keyword);
	const [currentService, setCurrentService] = useState(service);
	// Search drawer state
	const [state, setState] = useState({
		right: false,
	});

	const { back } = useRouter();

	const handleBack = () => back();

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleSearchClick = (srchKeyword, searchLocation, currService) => {
		// TODO handle search
		console.log("search", srchKeyword);
		setSearchKeyword(srchKeyword);
		setCurrentService(currService);
	};

	return (
		<div className="">
			<div className="sticky top-0 bg-white z-10">
				<div className="py-4 px-2">
					<span className="absolute top-3">
						<IconButton onClick={handleBack}>
							<ChevronLeftIcon />
						</IconButton>
					</span>
					<h4 className="text-center">Search</h4>
				</div>
				<button
					onClick={toggleDrawer("right", true)}
					className="w-full px-4 hover:cursor-text"
				>
					<div className="bg-[color:var(--input-bg-secondary)] rounded-md flex items-center gap-2 py-3 pl-4">
						<SearchIcon fontSize="small" sx={{ color: "var(--label-color)" }} />
						<p className="font-light text-sm text-[color:var(--label-color)] ">
							{searchKeyword}
						</p>
					</div>
				</button>
				<SearchDrawer
					toggleDrawer={toggleDrawer}
					state={state}
					query={keyword}
					route="search"
					handleSearchClick={handleSearchClick}
				/>
				<SearchFilters />
			</div>

			<SearchResultDisplay
				service={currentService}
				searchKeyword={searchKeyword}
			/>
		</div>
	);
}

export default Search;

export async function getServerSideProps(context) {
	// Access the query parameters from the context object
	const { query } = context;
	const { keyword, service, location } = query;
	console.log("serverside", query);

	return {
		props: {
			keyword,
			service,
			location,
		},
	};
}
