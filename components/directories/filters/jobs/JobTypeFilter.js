import React from "react";
import styles from "../../../../styles/components/directory/filters/jobs/job-type-filter.module.css";

function JobTypeFilter() {
	return (
		<div className={`${styles.job_type_filter_box}`}>
			<h4 className="lg:text-base">Job type</h4>
			<div className="flex w-full gap-2 flex-wrap">
				{jobTypes.map((job) => (
					<button
						key={job}
						className="text-sm font-extralight border rounded-full max-w-fit px-2 py-1"
					>
						{job}
					</button>
				))}
			</div>
		</div>
	);
}

export default JobTypeFilter;

const jobTypes = [
	"Full-time",
	"Part-time",
	"Intership",
	"On-demand",
	"Seasonal",
	"Volunteer",
	"Freelance",
];
