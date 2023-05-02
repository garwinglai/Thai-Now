import React, { useState, useEffect } from "react";
import styles from "../../styles/components/layouts/nav-mobile.module.css";
import logo_black from "../../public/images/logos/logo_black.svg";
import thai_royal_logo from "../../public/images/logos/royal_thai_logo.svg";
import icon_bell_notif_black from "../../public/images/icons/icon_bell_notif_black.svg";
import icon_account_black from "../../public/images/icons/icon_account_black.svg";
import icon_search_black from "../../public/images/icons/icon_search_black.svg";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton } from "@mui/material";
import NavOptions from "../home/NavOptions";
import { useRouter } from "next/router";
import Link from "next/link";

function NavMobile() {
	const [navScroll, setNavScroll] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [currDirectory, setCurrDirectory] = useState("");

	const router = useRouter();
	const { directory } = router.query;

	useEffect(() => {
		detectScroll();
	}, [lastScrollY, detectScroll]);

	useEffect(() => {
		console.log("directory", directory);
	}, [directory]);

	function detectScroll() {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);
		} else {
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}

	function controlNavbar() {
		if (typeof window !== "undefined") {
			const scrollPosition = window.scrollY;
			const offerSectionYPosition = localStorage.getItem(
				"offersYPositionMobile"
			);
			let scrollDirection = "down";

			if (scrollPosition < lastScrollY) {
				scrollDirection = "up";
			}

			if (scrollDirection === "up") {
				if (scrollPosition <= offerSectionYPosition) {
					setNavScroll(false);
				}
			}

			if (scrollDirection === "down") {
				if (scrollPosition > offerSectionYPosition) {
					setNavScroll(true);
				}
			}

			setLastScrollY(window.scrollY);
		}
	}

	return (
		<div className={`${styles.nav}`}>
			<div className={`${styles.nav_top}`}>
				<div className={`${styles.nav_right} ${styles.flex}`}>
					<Link href="/">
						<Image
							alt="Logo"
							src={logo_black}
							height={35}
							width="auto"
							className={`${styles.thai_now_logo}`}
						/>
					</Link>
					<Image
						alt="Royal thai logo"
						src={thai_royal_logo}
						width="auto"
						height={35}
						styles={{ color: "var(--white)" }}
						className={`${styles.royal_thai_logo}`}
					/>
				</div>

				<div className={`${styles.nav_left} ${styles.flex}`}>
					<IconButton>
						<SearchIcon color="action" fontSize="medium" />
					</IconButton>
					<IconButton>
						<NotificationsNoneIcon color="action" />
					</IconButton>
					<IconButton>
						<PersonOutlineOutlinedIcon color="action" />
					</IconButton>
				</div>
			</div>
			<div
				className={`${styles.nav_options_scroll_hide} ${
					(navScroll || directory) && styles.nav_options_scroll_show
				}`}
			>
				<NavOptions isScroll={navScroll} isMobile={true} />
			</div>
		</div>
	);
}

export default NavMobile;
