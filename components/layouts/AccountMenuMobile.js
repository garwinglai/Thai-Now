import React from "react";
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
import Avatar from "@mui/material/Avatar";
import Link from "next/link";

function AccountMenuMobile({ onClose }) {
	return (
		<div className={`${styles.account_menu_box} ${styles.flexCol}`}>
			<div className={`${styles.close_button}`}>
				<IconButton onClick={onClose("right", false)}>
					<CloseIcon />
				</IconButton>
			</div>
			<div className={`${styles.header} ${styles.flex}`}>
				<Avatar
					sx={{ width: 54, height: 54 }}
					src={avatar_image_2}
					alt="profile image"
				/>
				<div className={`${styles.header_context}`}>
					<p>Welcome</p>
					<h4>Lolar Ramsey</h4>
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
					<Link href="/profile">
						<MenuItem sx={{ padding: "0 2rem" }}>
							<ListItemIcon>
								<PersonOutlineOutlinedIcon fontSize="small" />
							</ListItemIcon>
							<ListItemText>Personal info</ListItemText>
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
					<MenuItem sx={{ padding: "0 2rem" }}>
						<ListItemIcon>
							<StoreOutlinedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Business on ThaiNow</ListItemText>
						<ArrowForwardIosIcon fontSize="small" />
					</MenuItem>
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
			</MenuList>
		</div>
	);
}

export default AccountMenuMobile;
