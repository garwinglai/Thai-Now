import React from "react";
import styles from "../../../../styles/components/directory/filters/filter-title.module.css";
import CloseIcon from "@mui/icons-material/Close";
import FilterSortButtonGroup from "../FilterSortButtonGroup";
import PriceRangeFilter from "./PriceRangeFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { IconButton } from "@mui/material";

function HousingFilters({ directory, closeDrawer }) {
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
				<PriceRangeFilter />
			</div>
			<div className={`${styles.filter_section_box}`}>
				<PropertyTypeFilter />
			</div>
			<FilterSortButtonGroup />
		</div>
	);
}

export default HousingFilters;
