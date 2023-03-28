import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/components/layouts/nav.module.css";
import gStyles from "../../styles/global.module.css";
import logo from "../../public/images/header/logo.png";
import thai_royal_logo from "../../public/images/header/royal_thai_logo.png";
import LoginButton from "../buttons/LoginButton";
import icon_bell from "../../public/images/header/icon-bell-badge-outline.png";
import down_arrow from "../../public/images/thai_now_icons/icon-arrow-down.png";
import SearchBarGeo from "../search/SearchBarGeo";
import pin_deal from "../../public/images/thai_now_icons/pin-deal.png";
import pin_job from "../../public/images/thai_now_icons/pin-jobs.png";
import pin_housing from "../../public/images/thai_now_icons/pin-housing.png";
import pin_marketplace from "../../public/images/thai_now_icons/pin-marketplace.png";

function Nav() {
	const [showNav, setShowNav] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		detectScroll();
	}, [lastScrollY]);

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
			let scrollDirection = "down";

			if (scrollPosition < lastScrollY) {
				scrollDirection = "up";
			}

			if (scrollDirection === "up") {
				if (scrollPosition < 601) {
					setShowNav(false);
				}
			}

			if (scrollDirection === "down") {
				if (window.scrollY > 5) {
					// if scroll down hide the navbar
					setShowNav(true);
				} else {
					// if scroll up show the navbar
					setShowNav(false);
				}
			}

			setLastScrollY(window.scrollY);
		}
	}

	return (
		<div className={`${styles.nav} ${showNav && styles.nav_scroll}`}>
			<div
				className={`${styles.nav_top} ${styles.flex} ${
					showNav && styles.nav_top_scroll
				}`}
			>
				<div className={`${styles.nav_right} ${styles.flex}`}>
					<Image alt="Logo" src={logo} width={70} />
					<Image
						alt="Royal thai logo"
						src={thai_royal_logo}
						width={45}
						styles={{ color: "var(--white)" }}
					/>
				</div>
				<SearchBarGeo showNav={showNav} />
				<div className={`${styles.nav_left} ${styles.flex}`}>
					<div className={`${styles.nav_left_icons} ${styles.flex}`}>
						<Image alt="bell icon" src={icon_bell} />
						<p>|</p>
						<button className={`${styles.language_button} ${styles.flex}`}>
							<>
								<p className={`${gStyles.medium_bold}`}>EN</p>
								<Image alt="down arrow" src={down_arrow} />
							</>
						</button>
					</div>
					<LoginButton />
				</div>
			</div>
			<div
				className={`${styles.nav_bottom_container} ${styles.flex} ${
					showNav ? styles.visible_nav_bottom : styles.invisible_nav_bottom
				}`}
			>
				<div className={`${styles.nav_bottom} ${styles.flex} `}>
					{navOptions.map((option, index) => {
						return (
							<div
								key={index}
								className={`${styles.flex} ${styles.nav_options_group}`}
							>
								<Image alt={option.alt} src={option.image} width={45} />
								<p className={`${gStyles.p_xs}`}>{option.name}</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Nav;

// * Mapping the options for different business avenues.
const navOptions = [
	{
		image: pin_deal,
		name: "Thai Help",
		alt: "help icon",
	},
	{
		image: pin_job,
		name: "Jobs",
		alt: "jobs icon",
	},
	{
		image: pin_housing,
		name: "Housing",
		alt: "house icon",
	},
	{
		image: pin_deal,
		name: "Deals",
		alt: "deals icon",
	},
	{
		image: pin_marketplace,
		name: "Marketplace",
		alt: "market icon",
	},
	{
		image: pin_deal,
		name: "Thai Business",
		alt: "business icon",
	},
	{
		image: pin_deal,
		name: "Guides Book",
		alt: "guide book icon",
	},
	{
		image: pin_deal,
		name: "Thai Tasks",
		alt: "task icon",
	},
];
