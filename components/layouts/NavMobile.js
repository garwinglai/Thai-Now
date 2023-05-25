import React, { useState, useEffect } from "react";
import styles from "../../styles/components/layouts/nav-mobile.module.css";
import logo_black from "../../public/static/images/logos/logo_black.svg";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Avatar, IconButton } from "@mui/material";
import NavOptions from "../home/NavOptions";
import { useRouter } from "next/router";
import Link from "next/link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AccountMenuMobile from "./AccountMenuMobile";

function NavMobile({ auth, route }) {
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const [navScroll, setNavScroll] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [currDirectory, setCurrDirectory] = useState("");
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const router = useRouter();
	const { directory } = router.query;
	console.log(route, navScroll);

	useEffect(() => {
		const detectScroll = () => {
			if (typeof window !== "undefined") {
				window.addEventListener("scroll", controlNavbar);
			} else {
				return () => {
					window.removeEventListener("scroll", controlNavbar);
				};
			}
		};

		const controlNavbar = () => {
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
		};

		detectScroll();
	}, [lastScrollY]);

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	return (
		<nav className={`${styles.nav}`}>
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
				</div>

				<div className={`${styles.nav_left} ${styles.flex}`}>
					<IconButton>
						<SearchIcon color="action" fontSize="medium" />
					</IconButton>
					<IconButton>
						<NotificationsNoneIcon color="action" />
					</IconButton>
					{isLoggedIn ? (
						<React.Fragment>
							<IconButton onClick={toggleDrawer("right", true)}>
								<Avatar sx={{ width: 25, height: 25 }} color="action" />
							</IconButton>
							<SwipeableDrawer
								anchor={"right"}
								open={state["right"]}
								onClose={toggleDrawer("right", false)}
								onOpen={toggleDrawer("right", true)}
							>
								<AccountMenuMobile onClose={toggleDrawer} />
							</SwipeableDrawer>
						</React.Fragment>
					) : (
						<Link href="/auth/signin">
							<IconButton>
								<PersonOutlineOutlinedIcon color="action" />
							</IconButton>
						</Link>
					)}
				</div>
			</div>

			<div
				className={`${styles.nav_options_scroll_hide} ${
					((navScroll && route != "terms" && route != "profile") ||
						route === "directory") &&
					styles.nav_options_scroll_show
				}`}
			>
				<NavOptions isScroll={navScroll} isMobile={true} />
			</div>
		</nav>
	);
}

export default NavMobile;
