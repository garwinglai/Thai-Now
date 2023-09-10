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
import { Avatar } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AccountMenuDesktop from "../menus/AccountMenuDesktop";
import { useAuth } from "../auth/AuthProvider";

function NavDesktop({ route, classicUser, bizUser }) {
  const { authUser, loading } = useAuth();
  // const { uid } = authUser;

  const [anchorEl, setAnchorEl] = useState(null);
  const [navScroll, setNavScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [profPic, setProfPic] = useState("");

  const router = useRouter();
  const { directory } = router.query;
  const open = Boolean(anchorEl); //account menu open

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
      className={`hidden lg:block lg:fixed lg:z-20 lg:w-full  ${
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
                  authUser ? "border-x" : `border-l`
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
          {authUser ? (
            <React.Fragment>
              <button
                className="flex gap-2 items-center pl-4"
                onClick={handleOpenAccountMenu}
              >
                {profPic && (
                  <Avatar className="w-10 h-10">
                    <Image
                      src={profPic}
                      alt="profile image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Avatar>
                )}
                <p
                  className={`font-normal ${
                    directory || navScroll || route
                      ? `text-black`
                      : `text-white`
                  }`}
                >
                  {loggedInUserName}
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
                bizUser={bizUser}
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
      {route === "thai-help" && <NavOptions isScroll={true} isDesktop={true} />}
    </nav>
  );
}

export default NavDesktop;
