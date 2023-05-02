import React, { useState, useEffect } from "react";
import styles from "../../styles/components/directory/directory-header.module.css";
import Link from "next/link";
import thai_jobs_icon from "../../public/images/icons/thai_jobs_icon.svg";
import { navOptions } from "@/helper/db/staticData";
import Image from "next/image";
import SortIcon from "@mui/icons-material/Sort";
import TuneIcon from "@mui/icons-material/Tune";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SortSearchResults from "./filters/SortSearchResultsÏ";

function DirectoryHeader({ directory }) {
	const [capitalizedDirectory, setCapitalizedDirectory] = useState("");
	const [openSortDrawer, setOpenSortDrawer] = useState(false);

	useEffect(() => {
		if (directory === "businesses") {
			setCapitalizedDirectory("Thai business");
			return;
		}

		const firstLetter = directory.charAt(0);
		const firstLetterCap = firstLetter.toUpperCase();
		const remainingLetters = directory.slice(1);
		const capitalizedDirectory = firstLetterCap + remainingLetters;

		setCapitalizedDirectory(capitalizedDirectory);
	}, [directory]);

	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenSortDrawer(open);
	};

	const closeDrawer = () => {
		setOpenSortDrawer(false);
	};

	return (
		<div className={`${styles.directory_header_container}`}>
			<div className={`${styles.breadcrumbs} ${styles.flex}`}>
				<p className={`${styles.blue}`}>Home</p>
				<p>{`>`}</p>
				<p className={`${styles.blue}`}>Services</p>
				<p>{`>`}</p>
				<p className={`${styles.directory_crumb}`}>{directory}</p>
			</div>
			<div className={`${styles.title_group} ${styles.flex}`}>
				<Image
					src={thai_jobs_icon}
					alt="jobs icon"
					className={`${styles.directory_icon}`}
				/>
				<h4>{capitalizedDirectory} near Los Angeles, CA</h4>
			</div>
			<div className={`${styles.filters_group} ${styles.flex}`}>
				<button
					onClick={toggleDrawer(true)}
					className={`${styles.flex} ${styles.button_box} ${styles.posted_date_filter}`}
				>
					<SortIcon />
					<p>Posted Date</p>
				</button>
				<SwipeableDrawer
					anchor={"bottom"}
					open={openSortDrawer}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					<SortSearchResults closeDrawer={closeDrawer} />
				</SwipeableDrawer>

				<button
					className={`${styles.flex} ${styles.button_box} ${styles.fitler_button}`}
				>
					<TuneIcon />
					<p>Filter</p>
				</button>
			</div>
			<div className={`${styles.footer_desktop} ${styles.flex}`}>
				<div className={`${styles.footer_left}`}>
					<p className={`${styles.footer_color_p_gray}`}>
						18 results for{" "}
						<span
							className={`${styles.directory_color}`}
						>{`"${capitalizedDirectory}"`}</span>
					</p>
				</div>
				<div className={`${styles.footer_right} ${styles.flex}`}>
					<p
						className={`${styles.footer_sort_p} ${styles.footer_color_p_gray}`}
					>
						Sort :
					</p>
					<button className={`${styles.flex} ${styles.desktop_sort_button} `}>
						<p className={`${styles.footer_posted_p}`}>Posted Date</p>
						<KeyboardArrowDownIcon fontSize="small" />
					</button>
				</div>
			</div>
		</div>
	);
}

export default DirectoryHeader;
