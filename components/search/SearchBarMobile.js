import React from "react";
import styles from "../../styles/components/search/search-bar-mobile.module.css";

import icon_search from "../../public/static/images/icons/icon_search_gray.svg";
import Image from "next/image";

function SearchBarMobile() {
	return (
		<div className={`${styles.search_mobile_container}`}>
			<div className={`${styles.search_mobile}`}>
				<Image src={icon_search} alt="search icon" width={25} height="auto" />
				<input type="text" placeholder="Search for Deals, Foods, Jobs, House" />
			</div>
		</div>
	);
}

export default SearchBarMobile;
