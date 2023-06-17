import React from "react";
import JobsCard from "../cards/JobsCard";
import DealsCard from "@/components/home/cards/DealsCard";
import tripsImage from "@/public/static/images/home/trips-image.svg";

function RecommendedPosts({ postType }) {
	const deal = {
		reviewScore: "2.93",
		reviewCount: "24",
		description: "hot deal",
		bizName: "Thai Food",
		location: "123 W Adams",
		image: tripsImage,
	};

	function displayDealCard(postType) {
		if (postType === "Jobs") {
			return (
				<>
					<DealsCard title="Deals of the week" deal={deal} />
					<DealsCard title="Deals of the week" deal={deal} />
					<DealsCard title="Deals of the week" deal={deal} />
					<DealsCard title="Deals of the week" deal={deal} />
				</>
			);
		}

		if (postType === "Housing")
			return (
				<>
					<DealsCard deal={deal} title="Room for rent" />
					<DealsCard deal={deal} title="Room for rent" />
					<DealsCard deal={deal} title="Room for rent" />
					<DealsCard deal={deal} title="Room for rent" />
				</>
			);

		if (postType === "Marketplace")
			return (
				<>
					<DealsCard deal={deal} title="Deals of the week" />
					<DealsCard deal={deal} title="Deals of the week" />
					<DealsCard deal={deal} title="Deals of the week" />
					<DealsCard deal={deal} title="Deals of the week" />
				</>
			);
	}

	return (
		<div className="bg-white text-[color:var(--deals-primary)]  pt-8">
			<h4 className="px-4 pt-4">More {postType} posted by ThaiNow</h4>
			<div className="flex overflow-x-scroll gap-4 px-4 pt-4 pb-16">
				{displayDealCard(postType)}
			</div>
		</div>
	);
}

export default RecommendedPosts;
