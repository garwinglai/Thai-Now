import JobsCard from "@/components/directories/cards/JobsCard";
import React from "react";

function SearchResultDisplay({ service, searchKeyword }) {
	console.log("servicing", service);

	return (
		<div className="px-4">
			<h4 className="text-[color:var(--deals-primary)] text-lg">{`Result in ${service} for "${searchKeyword}"`}</h4>
			<div>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
				<JobsCard
					isBusinessCenter={false}
					isBusinessUser={false}
					directory={service}
				/>
			</div>
		</div>
	);
}

export default SearchResultDisplay;
