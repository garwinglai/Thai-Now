import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import Link from "next/link";

function AccountPrivateMenu({ currentRoute }) {
  return (
    <MenuList>
      <div className="">
        <Link href="/profile">
          <MenuItem sx={{ padding: "0 1rem" }}>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon
                fontSize="small"
                sx={{
                  color:
                    currentRoute === "profile" ? "var(--deals-primary)" : "",
                }}
              />
            </ListItemIcon>
            <p
              className={`font-light py-4 ${
                currentRoute === "profile" &&
                "text-[color:var(--deals-primary)]"
              }`}
            >
              My Profile
            </p>
          </MenuItem>
        </Link>
        <Link href="/profile/password">
          <MenuItem sx={{ padding: "0 1rem" }}>
            <ListItemIcon>
              <LockOutlinedIcon
                fontSize="small"
                sx={{
                  color:
                    currentRoute === "password" ? "var(--deals-primary)" : "",
                }}
              />
            </ListItemIcon>
            <p
              className={`font-light py-4 ${
                currentRoute === "password" &&
                "text-[color:var(--deals-primary)]"
              }`}
            >
              Password
            </p>
          </MenuItem>
        </Link>
      </div>
      <div className="">
        <Link href="/profile/saved-list">
          <MenuItem sx={{ padding: "0 1rem" }}>
            <ListItemIcon>
              <StarOutlineOutlinedIcon
                fontSize="small"
                sx={{
                  color: currentRoute === "saved" ? "var(--deals-primary)" : "",
                }}
              />
            </ListItemIcon>
            <p
              className={`font-light py-4 ${
                currentRoute === "saved" && "text-[color:var(--deals-primary)]"
              }`}
            >
              Saved
            </p>
          </MenuItem>
        </Link>
      </div>
      <div className="">
        <Link href="/business-center/classic">
          <MenuItem sx={{ padding: "0 1rem" }}>
            <ListItemIcon>
              <StoreOutlinedIcon
                fontSize="small"
                sx={{
                  color:
                    currentRoute === "business-center"
                      ? "var(--deals-primary)"
                      : "",
                }}
              />
            </ListItemIcon>
            <p
              className={`font-light py-4 ${
                currentRoute === "business-center" &&
                "text-[color:var(--deals-primary)]"
              }`}
            >
              My Business
            </p>
          </MenuItem>
        </Link>
      </div>
    </MenuList>
  );
}

export default AccountPrivateMenu;
