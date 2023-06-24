import React from "react";
import SalaryFilter from "../SalaryFilter";
import JobTypeFilter from "../JobTypeFilter";
import DatePostedFilter from "../DatePostedFilter";
import ExperienceFilter from "../ExperienceFilter";
import FilteredBy from "./FilteredBy";
import Divider from "@mui/material/Divider";

function JobFiltersDesktop() {
	return (
		<div className="flex flex-col gap-2 w-60 px-4">
			<FilteredBy />
			<Divider />
			<SalaryFilter />
			<Divider />
			<JobTypeFilter />
			<Divider />
			<DatePostedFilter />
			<Divider />
			<ExperienceFilter />
		</div>
	);
}

export default JobFiltersDesktop;
