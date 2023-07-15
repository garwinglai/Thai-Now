import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo_white from "../../public/static/images/logos/logo_white.png";
import logo_black from "../../public/static/images/logos/logo_black.png";
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

function NavDesktop({ route }) {
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

  console.log(navScroll, directory, route);

  return (
    <nav
      className={`hidden lg:block lg:fixed lg:z-10 lg:w-full  ${
        (navScroll || directory || route) && `bg-white lg:shadow-md`
      }`}
    >
      <div
        className={`flex justify-between items-center py-4 px-8 ${
          (navScroll || directory || route) && `border-b`
        }`}
      >
        <div>
          <Link href="/">
            <Image
              alt="Logo"
              src={navScroll || directory || route ? logo_black : logo_white}
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div
          className={
            directory || navScroll || route ? "block w-[40%]" : "hidden"
          }
        >
          <SearchBarGeo
            navScrollAppear={navScroll || directory || route}
            scrollSearchBar={true}
          />
        </div>
        <div className="flex">
          <div className="flex items-center gap-2">
            {/* <Image alt="bell icon" src={icon_bell_notif_white} /> */}
            <IconButton>
              <NotificationsNoneOutlinedIcon
                sx={{
                  color: navScroll || directory || route ? "black" : "white",
                }}
              />
            </IconButton>
            <div className="">
              <div
                className={`flex pl-4 pr-2 items-center ${
                  user ? "border-x" : `border-l`
                } `}
              >
                <p
                  className={`${
                    directory || navScroll || route
                      ? `text-black`
                      : `text-white`
                  } font-normal`}
                >
                  EN
                </p>
                {/* <Image alt="down arrow" src={down_arrow} /> */}
                <IconButton>
                  <KeyboardArrowDownOutlinedIcon
                    sx={{
                      color:
                        navScroll || directory || route ? "black" : "white",
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </div>
          {user ? (
            <React.Fragment>
              <button
                className="flex gap-2 items-center pl-4"
                onClick={handleOpenAccountMenu}
              >
                <Avatar sx={{ width: 30, height: 30 }} color="action" />
                <p
                  className={`font-normal ${
                    directory || navScroll || route
                      ? `text-black`
                      : `text-white`
                  }`}
                >
                  Lolar Ramsey
                </p>
                {open ? (
                  <ExpandLessIcon
                    sx={{
                      color:
                        directory || navScroll || route ? "black" : "white",
                      marginTop: "2px",
                    }}
                  />
                ) : (
                  <ExpandMoreIcon
                    sx={{
                      color:
                        directory || navScroll || route ? "black" : "white",
                      marginTop: "2px",
                    }}
                  />
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
        className={
          !directory
            ? route
              ? "hidden"
              : navScroll
              ? `block`
              : `hidden`
            : `block`
        }
      >
        <NavOptions isScroll={true} isDesktop={true} />
      </div>
    </nav>
  );
}

export default NavDesktop;
