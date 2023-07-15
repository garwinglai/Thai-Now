import React from "react";
import { navOptions } from "@/helper/db/staticData";
import styles from "../../styles/components/home/nav-options.module.css";
import Image from "next/image";
import Link from "next/link";

function NavOptions({ isScroll, isMobile, isDesktop, source, route }) {
  // Don't show Navigation options on Post Detail pages
  if (route === "post-detail") return;

  function navOptionsStatic() {
    return (
      <div className={`${styles.options_container} ${styles.flex}`}>
        {navOptions.map((option, index) => {
          return (
            <Link
              key={index}
              href={`/${option.route}`}
              className={`${styles.link_group} ${styles.flexCol}`}
            >
              <Image
                alt={option.alt}
                src={option.image}
                className={`${styles.image_style}`}
              />
              <p>{option.name}</p>
            </Link>
          );
        })}
      </div>
    );
  }

  function navOptionsScroll() {
    return (
      <div className={`${styles.options_container_scroll} ${styles.flex}  `}>
        {navOptions.map((option, index) => {
          return (
            <Link
              key={index}
              href={`/${option.route}`}
              className={`${styles.link_group_scroll} ${styles.flexCol}`}
            >
              <Image
                alt={option.alt}
                src={option.image}
                className={`${styles.image_style_scroll}`}
              />
              <p>{option.name}</p>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {source == "home" && navOptionsStatic()}
      {(isMobile || isDesktop) && navOptionsScroll()}
    </>
  );
}

export default NavOptions;
