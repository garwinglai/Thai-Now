import React from "react";
import styles from "../../styles/components/search/search-bar-geo.module.css";
import gStyles from "../../styles/global.module.css";
import icon_search from "../../public/static/images/icons/search_icon.svg";
import Image from "next/image";
import { Divider } from "@mui/material";

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
      <div className="shadow h-9 flex items-center ">
        <input
          id="search"
          className="text-xs font-light indent-2 flex-grow focus:outline-transparent rounded-l border-none focus:ring-0"
          type="text"
          placeholder="Search for Deals, Foods, Jobs, House"
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginTop: "8px", marginBottom: "8px" }}
        />
        <input
          className="text-xs font-light border-none border-black indent-2 focus:outline-transparent focus:ring-0 "
          type="text"
          value="Los Angeles, CA"
          onChange={handleSearch}
        />
        <button className="bg-[color:var(--secondary)] px-4 rounded-r h-full">
          <Image alt="search icon" src={icon_search} className="w-4 h-4" />
        </button>
      </div>
    );
}

export default SearchBarGeo;
