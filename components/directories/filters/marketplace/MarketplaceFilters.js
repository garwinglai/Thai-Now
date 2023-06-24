import React from "react";
import styles from "../../../../styles/components/directory/filters/filter-title.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import MarketTypeFilter from "./MarketTypeFilter";
import MarketPriceFilter from "./MarketPriceFilter";
import FilterSortButtonGroup from "../FilterSortButtonGroup";
import DistanceFilter from "../housing/DistanceFilter";

function MarketplaceFilters({ directory, closeDrawer }) {
	return (
		<div className={`${styles.filter_box}`}>
			<div className={`${styles.title_box}`}>
				<h1>Filter</h1>
				<div className={`${styles.close_sort_box}`}>
					<IconButton onClick={closeDrawer(directory, false)}>
						<CloseIcon fontSize="medium" />
					</IconButton>
				</div>
			</div>
			<div className={`${styles.filter_section_box}`}>
				<MarketTypeFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<MarketPriceFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<DistanceFilter />
			</div>
			<FilterSortButtonGroup />
		</div>
	);
}

export default MarketplaceFilters;
