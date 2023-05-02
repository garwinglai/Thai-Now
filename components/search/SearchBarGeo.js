import React from "react";
import styles from "../../styles/components/search/search-bar-geo.module.css";
import gStyles from "../../styles/global.module.css";
import icon_search from "../../public/images/icons/search_icon.svg";
import Image from "next/image";

function SearchBarGeo({ navScrollAppear, scrollSearchBar }) {
	// let navScroll = false;

	function handleSearch(e) {
		const { name, value } = e.target;
	}

	if (!navScrollAppear && !scrollSearchBar)
		return (
			<div className={`${styles.nav_absolute_container}`}>
				<div className={`${styles.flex} ${styles.nav_absolute}`}>
					<input
						id="search"
						className={`${styles.search_input} ${styles.search}`}
						type="text"
						placeholder="Search for Deals, Foods, Jobs, House"
						onChange={handleSearch}
					/>
					<input
						className={`${styles.search_location} ${styles.search}`}
						type="text"
						value="Los Angeles, CA"
						onChange={handleSearch}
					/>
					<button
						className={`${styles.flex} ${gStyles.button_primary} ${gStyles.button_small_and_search} ${styles.search_button}`}
					>
						<Image
							src={icon_search}
							alt="search icon"
							className={`${styles.search_icon}`}
							width={15}
							height="auto"
						/>
						<p>Search</p>
					</button>
				</div>
			</div>
		);

	if (scrollSearchBar)
		return (
			<div
				className={`${styles.search_bar_geo_hidden} ${styles.flex} ${
					navScrollAppear && styles.search_bar_geo_show
				}`}
			>
				<input
					id="search"
					className={`${styles.search_input_scroll} ${styles.search}`}
					type="text"
					placeholder="Search for Deals, Foods, Jobs, House"
				/>

				<input
					className={`${styles.search_location_scroll} ${styles.search}`}
					type="text"
					value="Los Angeles, CA"
					onChange={handleSearch}
				/>
				<button
					className={`${gStyles.button_primary} ${gStyles.button_small_search} ${styles.search_button} `}
				>
					<Image alt="search icon" src={icon_search} />
				</button>
			</div>
		);
}

export default SearchBarGeo;
