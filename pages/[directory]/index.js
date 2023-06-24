import React from "react";
import DirectoryHeader from "@/components/directories/DirectoryHeader";
import JobsCard from "@/components/directories/cards/JobsCard";
import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/Map";
import HousingCard from "@/components/directories/cards/HousingCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCard from "@/components/directories/cards/BusinessCard";
import MainLayout from "@/components/layouts/MainLayout";
import ThaiHelpCategory from "@/components/directories/thai-help/ThaiHelpCategory";
import SearchResultCard from "@/components/directories/thai-help/SearchResultCard";
import Pagination from "@mui/material/Pagination";
import JobFiltersDesktop from "@/components/directories/filters/jobs/desktop/JobFiltersDesktop";
import HousingFiltersDesktop from "@/components/directories/filters/housing/desktop/HousingFiltersDesktop";
import MarketplaceFiltersDesktop from "@/components/directories/filters/marketplace/desktop/MarketplaceFiltersDesktop";

const tempCount = [1, 2, 3, 4, 5];

function Directory({ directory }) {
	function cardType(directory) {
		if (directory == "jobs") {
			return tempCount.map((item) => (
				<JobsCard key={item} directory={directory} />
			));
		}

		if (directory == "housing") {
			return tempCount.map((item) => (
				<HousingCard key={item} directory={directory} />
			));
		}

		// if (directory == "deals") {
		// 	return tempCount.map((item) => (
		// 		<DealCard key={item} directory={directory} />
		// 	));
		// }

		if (directory == "marketplace") {
			return tempCount.map((item) => (
				<MarketplaceCard key={item} directory={directory} />
			));
		}

		if (directory == "businesses") {
			return tempCount.map((item) => (
				<BusinessCard key={item} directory={directory} />
			));
		}

		if (directory === "thai-help") {
			return (
				<React.Fragment>
					<SearchResultCard directory={directory} postType="housing" />
					<SearchResultCard directory={directory} postType="living" />
					<SearchResultCard directory={directory} postType="health" />
				</React.Fragment>
			);
		}
	}

	function displayFilter(directory) {
		if (directory == "jobs") return <JobFiltersDesktop />;

		if (directory == "housing") return <HousingFiltersDesktop />;

		if (directory == "marketplace") return <MarketplaceFiltersDesktop />;
	}

	return (
		<div className="flex ">
			<div className="hidden lg:block">{displayFilter(directory)}</div>
			<div className="flex-grow lg:mt-4">
				<DirectoryHeader directory={directory} />
				<div className=" min-h-[0.5rem] bg-[color:var(--divider)]"></div>

				{directory === "thai-help" && <ThaiHelpCategory />}
				<div className="px-4">{cardType(directory)}</div>
				<div className="fixed bottom-5 left-[50%] -translate-x-[50%] lg:hidden">
					<Fab variant="extended" color="primary" aria-label="map view">
						<MapIcon sx={{ mr: 1 }} />
						View on Map
					</Fab>
				</div>
				<div className="flex justify-center pt-8 pb-16">
					<Pagination count={10} color="primary" />
				</div>
			</div>
			<div className="hidden lg:block lg:mt-4">
				<h4>Map section</h4>
			</div>
		</div>
	);
}

export default Directory;

export async function getStaticPaths() {
	const paths = [
		{ params: { directory: "thai-help" } },
		{ params: { directory: "jobs" } },
		{ params: { directory: "housing" } },
		// { params: { directory: "deals" } },
		{ params: { directory: "marketplace" } },
		// { params: { directory: "businesses" } },
		// { params: { directory: "guides" } },
		// { params: { directory: "thai-talks" } },
	];

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	};
}

export async function getStaticProps(context) {
	const { directory } = context.params;
	return {
		props: { directory }, // will be passed to the page component as props
		revalidate: 10,
	};
}

Directory.getLayout = function getLayout(page) {
	return <MainLayout route="directory">{page}</MainLayout>;
};
