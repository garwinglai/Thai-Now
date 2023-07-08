import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../styles/components/layouts/nav-desktop.module.css";
import gStyles from "../../styles/global.module.css";
import logo_white from "../../public/static/images/logos/logo_white.svg";
import logo_black from "../../public/static/images/logos/logo_black.svg";
import thai_royal_logo from "../../public/static/images/logos/royal_thai_logo.svg";
import LoginButton from "../buttons/LoginButton";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { IconButton } from "@mui/material";
import SearchBarGeo from "../search/SearchBarGeo";
import NavOptions from "../home/NavOptions";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import { Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountMenuDesktop from "../menus/AccountMenuDesktop";

function NavDesktop() {
  const user = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [navScroll, setNavScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  const { directory } = router.query;
  const open = Boolean(anchorEl); //account menu open

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
        const offerSectionYPosition = localStorage.getItem("offersYPosition");
        let scrollDirection = "down";

        if (scrollPosition < lastScrollY) {
          scrollDirection = "up";
        }

        if (scrollDirection === "down") {
          if (scrollPosition > offerSectionYPosition) {
            setNavScroll(true);
          }
        }

        if (scrollDirection === "up") {
          if (scrollPosition <= offerSectionYPosition) {
            setNavScroll(false);
          }
        }

        setLastScrollY(scrollPosition);
      }
    };

    detectScroll();
  }, [lastScrollY]);

  const handleOpenAccountMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  return (
    <nav
      className={`${styles.nav} ${styles.flexCol} ${
        (navScroll || directory) && styles.nav_scroll
      } `}
    >
      <div className={`${styles.flex} ${styles.nav_top} `}>
        <div className={`${styles.nav_left} ${styles.flex}`}>
          <Link href="/">
            <Image
              alt="Logo"
              src={navScroll || directory ? logo_black : logo_white}
              className={`${styles.thai_now_logo_image}`}
            />
          </Link>
        </div>
        <SearchBarGeo
          navScrollAppear={navScroll || (directory && true)}
          scrollSearchBar={true}
        />
        <div className={`${styles.nav_right} ${styles.flex}`}>
          <div className="flex items-center gap-2">
            {/* <Image alt="bell icon" src={icon_bell_notif_white} /> */}
            <IconButton>
              <NotificationsNoneOutlinedIcon
                sx={{ color: navScroll || directory ? "black" : "white" }}
              />
            </IconButton>
            <div
              className={` px-4 ${styles.flex} ${
                (navScroll || directory) && styles.language_button_scroll
              }`}
            >
              <div className="flex pl-4 pr-2 items-center border-x">
                <p className={`${gStyles.medium_bold}`}>EN</p>
                {/* <Image alt="down arrow" src={down_arrow} /> */}
                <IconButton>
                  <KeyboardArrowDownOutlinedIcon
                    sx={{ color: navScroll || directory ? "black" : "white" }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
          {user ? (
            <React.Fragment>
              <button
                className="flex gap-2 items-center"
                onClick={handleOpenAccountMenu}
              >
                <Avatar sx={{ width: 30, height: 30 }} color="action" />
                <p className="font-extralight">Lolar Ramsey</p>
                {open ? (
                  <ExpandLessIcon sx={{ color: "white", marginTop: "2px" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "white", marginTop: "2px" }} />
                )}
              </button>

              <AccountMenuDesktop
                isDesktop={true}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseAccountMenu}
                handleOpenAccountMenu={handleOpenAccountMenu}
              />
            </React.Fragment>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
      <div
        className={`${styles.nav_options_scroll_hide} ${
          (navScroll || directory) && styles.nav_options_scroll_show
        }`}
      >
        <NavOptions isScroll={true} isDesktop={true} />
      </div>
    </nav>
  );
}

export default NavDesktop;
