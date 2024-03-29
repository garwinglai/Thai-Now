import React, { useState, useEffect } from "react";
import styles from "@/styles/components/layouts/account-menu-mobile.module.css";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ExplicitOutlinedIcon from "@mui/icons-material/ExplicitOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { IconButton } from "@mui/material";
import avatar_image from "../../public/static/images/temp_avatar.png";
import avatar_image_2 from "@/public/static/images/temp_avatar_2.jpeg";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "@/firebase/fireConfig";

function AccountMenuMobile({ onClose, bizUser, classicUser }) {
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [profPic, setProfPic] = useState("");

  const { push } = useRouter();

  useEffect(() => {
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

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        onClose("right", false);
        push("/");
      })
      .catch((error) => {
        console.log("problem signing out");
      });
  };

  return (
    <div className={`${styles.account_menu_box} ${styles.flexCol}`}>
      <div className={`${styles.close_button}`}>
        <IconButton onClick={onClose("right", false)}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={`${styles.header} ${styles.flex}`}>
        {profPic && (
          <Avatar className="w-10 h-10">
            <Image
              src={profPic}
              fill
              alt="profile image"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Avatar>
        )}
        <div className={`${styles.header_context}`}>
          <p>Welcome</p>
          <h4>{loggedInUserName}</h4>
        </div>
      </div>
      <MenuList onClick={onClose("right", false)}>
        <div className={`${styles.section_box}`}>
          <p>Login</p>
          <Link href="/profile/switch-account">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <GroupAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Switch account</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>Account</p>
          <Link href={`/profile`}>
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
          <Link href="/profile/password">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <LockOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Password</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>Saved List</p>
          <Link href="/profile/saved-list">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <StarOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Saved</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>Your Business</p>
          <Link href={`/business-center/${bizUser ? "business" : "classic"}`}>
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <StoreOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Business</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>General</p>
          <MenuItem sx={{ padding: "0 2rem" }}>
            <ListItemIcon>
              <ExplicitOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Language</ListItemText>
            <ArrowForwardIosIcon fontSize="small" />
          </MenuItem>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>Support</p>
          <Link href="/profile/help-center">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <HelpOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Help Center</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className={`${styles.section_box}`}>
          <p>About ThaiNow</p>
          <Link href="/terms/terms-of-service">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <InsertDriveFileOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Terms of Use</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
          <Divider sx={{ width: "90%", margin: "0 auto" }} />
          <Link href="/terms/privacy-policy">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Privacy Policy</ListItemText>
              <ArrowForwardIosIcon fontSize="small" />
            </MenuItem>
          </Link>
        </div>
        <div className={`${styles.section_box} mt-8`}>
          <button className="w-full text-left" onClick={handleLogOut}>
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </MenuItem>
          </button>
        </div>
      </MenuList>
    </div>
  );
}

export default AccountMenuMobile;
