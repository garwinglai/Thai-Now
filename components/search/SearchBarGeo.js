import React from "react";
import styles from "../../styles/components/search/search-bar-geo.module.css";
import gStyles from "../../styles/global.module.css";
import icon_search from "../../public/images/thai_now_icons_white/icon-search.png";
import Image from "next/image";

function SearchBarGeo({ showNav }) {
	return (
		<div
			className={`${styles.search_bar_geo} ${styles.flex} ${
				showNav ? styles.visible : styles.invisible
			}`}
		>
			<input
				id="search"
				className={`${styles.search_input}`}
				type="text"
				placeholder="Search for Deals, Foods, Jobs, House"
			/>
			{/* <label htmlFor="search" style={{ visibility: "hidden" }}>
				Search for Deals, Foods, Jobs, House
			</label> */}

			<p className={`${gStyles.p_small}`}>Los Angeles, CA</p>
			<button
				className={`${gStyles.button_primary} ${gStyles.button_small_search} ${styles.search_button}`}
			>
				<Image alt="search icon" src={icon_search} />
			</button>
		</div>
	);
}

export default SearchBarGeo;
