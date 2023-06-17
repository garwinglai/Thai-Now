import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import SearchLocationBar from "@/components/search/page/SearchLocationBar";
import RecentSearch from "@/components/search/page/RecentSearch";
import ServiceSearch from "@/components/search/page/ServiceSearch";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SearchResultDisplay from "@/components/search/results/SearchResultDisplay";
import SearchBar from "@/components/search/SearchBar";
import SearchFilters from "@/components/search/results/SearchFilters";

function SearchDrawer({
	toggleDrawer,
	state,
	query,
	route,
	handleSearchClick,
}) {
	const [searchKeyword, setSearchKeyword] = useState(query ? query : "");
	const [searchLocation, setSearchLocation] = useState("");
	const [currentService, setCurrentService] = useState("jobs");

	const { back, push } = useRouter();

	const handleBack = () => back();

	const handleSearchChange = (e) => {
		const { name, value } = e.target;
		setSearchKeyword(value);
	};

	const handleSearchLocationChange = (e) => {
		const { name, value } = e.target;
		setSearchLocation(value);
	};

	const handleServiceChange = (e) => {
		const { value } = e.target;
		setCurrentService(value);
	};

	const handleSearch = (e) => {
		if (route === "home") {
			push({
				pathname: "/search",
				query: {
					keyword: searchKeyword,
					service: currentService,
					location: searchLocation,
				},
			});
			return;
		}

		if (route === "search") {
			// TODO: search
			console.log("search Drawer keyword", searchKeyword);
			handleSearchClick(searchKeyword, searchLocation, currentService);
		}
	};

	return (
		<Drawer
			anchor={"right"}
			open={state["right"]}
			onClose={toggleDrawer("right", false)}
		>
			<div className="w-screen">
				<div className="py-4 px-2">
					<span className="absolute top-3">
						<IconButton onClick={toggleDrawer("right", false)}>
							<ChevronLeftIcon />
						</IconButton>
					</span>
					<h4 className="text-center">Search</h4>
				</div>
				<SearchBar
					handleOnChange={handleSearchChange}
					searchKeyword={searchKeyword}
				/>
				<SearchLocationBar
					handleOnChange={handleSearchLocationChange}
					searchKeyword={searchLocation}
				/>
				<RecentSearch />
				<ServiceSearch
					service={currentService}
					handleServiceChange={handleServiceChange}
				/>
				<div
					className="fixed bottom-0 w-full p-4"
					onClick={toggleDrawer("right", false)}
				>
					<PrimaryButton name="Search" handleClick={handleSearch} />
				</div>
			</div>
		</Drawer>
	);
}

export default SearchDrawer;
