import React, { useState, useEffect } from "react";
import styles from "../../styles/components/layouts/nav-mobile.module.css";
import logo_black from "../../public/static/images/logos/logo_black.png";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Avatar, IconButton } from "@mui/material";
import NavOptions from "../home/NavOptions";
import { useRouter } from "next/router";
import Link from "next/link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AccountMenuMobile from "../menus/AccountMenuMobile";
import SearchDrawer from "../search/page/SearchDrawer";
import { useAuth } from "../auth/AuthProvider";

function NavMobile({ auth, route, classicUser, bizUser }) {
  const { authUser, loading } = useAuth();

  const [navScroll, setNavScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currDirectory, setCurrDirectory] = useState("");
  const [state, setState] = useState({
    right: false,
  });
  const [searchDrawerState, setSearchDrawerState] = useState({
    right: false,
  });
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [profPic, setProfPic] = useState("");

  const router = useRouter();
  const { directory } = router.query;

  useEffect(() => {
    if (!authUser) return;

    if (bizUser) {
      const { name, profPic } = bizUser;
      const profileImage = profPic ? profPic["0-1"] : "";
      setProfPic(profileImage);
      setLoggedInUserName(name);
      return;
    }

    if (classicUser) {
      const { fName, lName, profPic } = classicUser;
      const profileImage = profPic ? profPic["0-1"] : "";
      const fullName = `${fName} ${lName}`;
      setLoggedInUserName(fullName);
      setProfPic(profileImage);
    }
  }, [classicUser, bizUser]);

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

  const toggleDrawerSearch = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSearchDrawerState({ ...searchDrawerState, [anchor]: open });
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
          <IconButton onClick={toggleDrawerSearch("right", true)}>
            <SearchIcon color="action" fontSize="medium" />
          </IconButton>
          <SearchDrawer
            toggleDrawer={toggleDrawerSearch}
            state={searchDrawerState}
            route="home"
          />
          <IconButton>
            <NotificationsNoneIcon color="action" />
          </IconButton>
          {authUser ? (
            <React.Fragment>
              <IconButton onClick={toggleDrawer("right", true)}>
                {profPic && (
                  <Avatar className="w-8 h-8">
                    <Image
                      src={profPic}
                      alt="profile image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Avatar>
                )}
              </IconButton>
              <SwipeableDrawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                onOpen={toggleDrawer("right", true)}
              >
                <AccountMenuMobile
                  onClose={toggleDrawer}
                  bizUser={bizUser}
                  classicUser={classicUser}
                />
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
        <NavOptions isScroll={navScroll} isMobile={true} route={route} />
      </div>
    </nav>
  );
}

export default NavMobile;
