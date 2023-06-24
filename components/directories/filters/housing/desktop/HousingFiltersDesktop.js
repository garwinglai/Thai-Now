import React from "react";
import FilteredBy from "../../jobs/desktop/FilteredBy";
import PriceRangeFilter from "../PriceRangeFilter";
import PropertyTypeFilter from "../PropertyTypeFilter";
import DistanceFilter from "../DistanceFilter";
import Divider from "@mui/material/Divider";

function HousingFiltersDesktop() {
	return (
		<div className="flex flex-col gap-2 w-60 px-4">
			<FilteredBy />
			<Divider />
			<PriceRangeFilter />
			<Divider />
			<PropertyTypeFilter />
			<Divider />
			<DistanceFilter />
		</div>
	);
}

export default HousingFiltersDesktop;
