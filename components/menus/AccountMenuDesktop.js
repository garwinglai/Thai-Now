import React from "react";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ExplicitOutlinedIcon from "@mui/icons-material/ExplicitOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import { signOut } from "@firebase/auth";
import { auth } from "@/firebase/fireConfig";

function AccountMenuDesktop({
  anchorEl,
  open,
  onClose,
  handleOpenAccountMenu,
}) {
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

  const handleMenuClick = () => {
    onClose();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{ marginTop: "3rem", padding: "0 1rem" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuList onClick={handleMenuClick}>
        <div className="">
          <Link href="/profile/switch-account">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <GroupAddOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Switch account</p>
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className="">
          <Link href="/profile">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">My Profile</p>
            </MenuItem>
          </Link>
          <Divider sx={{ width: "90%", margin: "0 auto" }} />
          <Link href="/profile/password">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <LockOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Password</p>
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className="">
          <Link href="/profile/saved-list">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <StarOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Saved</p>
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className="">
          <Link href="/business-center/classic">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <StoreOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">My Business</p>
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className="">
          <Link href="/profile/help-center">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <HelpOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Help Center</p>
            </MenuItem>
          </Link>
        </div>
        <Divider sx={{ width: "90%", margin: "0 auto" }} />
        <div className="">
          <Link href="/terms/terms-of-service">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <InsertDriveFileOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Terms of Use</p>
            </MenuItem>
          </Link>
          <Divider sx={{ width: "90%", margin: "0 auto" }} />
          <Link href="/terms/privacy-policy">
            <MenuItem sx={{ padding: "0 2rem" }}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <p className="font-light py-4">Privacy Policy</p>
            </MenuItem>
          </Link>
        </div>
        <div className="mt-4 hover:bg-gray-100">
          <button
            className="flex items-center px-8 py-4 gap-4"
            onClick={handleLogOut}
          >
            <LogoutIcon fontSize="small" sx={{ color: "gray" }} />
            <p className="font-light">Log out</p>
          </button>
        </div>
      </MenuList>
    </Menu>
  );
}

export default AccountMenuDesktop;
