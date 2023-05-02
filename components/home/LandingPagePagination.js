import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "../../styles/components/home/landing-page-pagination.module.css";
import gStyles from "../../styles/global.module.css";
import Link from "next/link";
import { IconButton } from "@mui/material";

function LandingPagePagination() {
	return (
		<div className={`${styles.pagination} ${styles.flex}`}>
			<Link href="/" className={`${styles.pagination_link_all}`}>
				<p className={`${gStyles.p_xs}`}>Show All (10)</p>
			</Link>
			<IconButton>
				<ArrowBackIosNewIcon fontSize="small" />
			</IconButton>
			<IconButton>
				<ArrowForwardIosIcon fontSize="small" />
			</IconButton>
		</div>
	);
}

export default LandingPagePagination;
