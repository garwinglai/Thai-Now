import React from "react";
import FilteredBy from "../../jobs/desktop/FilteredBy";
import MarketTypeFilter from "../MarketTypeFilter";
import MarketPriceFilter from "../MarketPriceFilter";
import DistanceFilter from "../../housing/DistanceFilter";
import Divider from "@mui/material/Divider";

function MarketplaceFiltersDesktop() {
	return (
		<div className="flex flex-col gap-2 w-60 px-4">
			<FilteredBy />
			<Divider />
			<MarketTypeFilter />
			<Divider />
			<MarketPriceFilter />
			<Divider />
			<DistanceFilter />
		</div>
	);
}

export default MarketplaceFiltersDesktop;
