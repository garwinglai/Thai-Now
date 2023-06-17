import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/pages/directory.module.css";
import DirectoryHeader from "@/components/directories/DirectoryHeader";
import JobsCard from "@/components/directories/cards/JobsCard";
import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/Map";
import HousingCard from "@/components/directories/cards/HousingCard";
import DealCard from "@/components/directories/cards/DealCard";
import MarketplaceCard from "@/components/directories/cards/MarketplaceCard";
import BusinessCard from "@/components/directories/cards/BusinessCard";
import MainLayout from "@/components/layouts/MainLayout";
import { PagesSharp } from "@mui/icons-material";

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

		if (directory == "deals") {
			return tempCount.map((item) => (
				<DealCard key={item} directory={directory} />
			));
		}

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
	}

	return (
		<div className={`${styles.directory} ${styles.flex}`}>
			<div className={`${styles.filters_box}`}>
				<h4>Filter section</h4>
			</div>
			<div className={`${styles.results_box}`}>
				<DirectoryHeader directory={directory} />
				<div className={`${styles.gray_divider}`}></div>
				<div className={`${styles.directory_cards_container}`}>
					{cardType(directory)}
				</div>
				<div className={`${styles.map_fab_mobile}`}>
					<Fab variant="extended" color="primary" aria-label="map view">
						<MapIcon sx={{ mr: 1 }} />
						View on Map
					</Fab>
				</div>
			</div>
			<div className={`${styles.map_view_box}`}>
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
		{ params: { directory: "deals" } },
		{ params: { directory: "marketplace" } },
		{ params: { directory: "businesses" } },
		{ params: { directory: "guides" } },
		{ params: { directory: "thai-talks" } },
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
