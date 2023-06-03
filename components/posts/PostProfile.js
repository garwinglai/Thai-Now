import React from "react";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { IconButton } from "@mui/material";

function PostProfile() {
	return (
		<div className="p-4 bg-white">
			<span className="flex items-center gap-3 mb-2">
				<Image
					src={avatar_image}
					alt="profile image"
					className="border-4 border-[color:var(--label-color)] rounded-full  w-16"
				/>
				<h4>Hosted by Lolar Ramsey</h4>
			</span>
			<div className="flex justify-between">
				<span className="flex items-center w-1\2/3 overflow-hidden whitespace-nowrap  ">
					<StarOutlinedIcon sx={{ color: "rgba(251, 197, 4, 1)" }} />
					<p className="font-extralight text-sm text-ellipsis overflow-hidden whitespace-nowrap">
						<span className="font-light">4.96 </span>
						(20 Reviews) - East Hollywood
					</p>
				</span>
				<span className="flex w-1/3">
					<IconButton>
						<StarOutlineOutlinedIcon
							sx={{ color: "var(--deals-primary)" }}
							fontSize="small"
						/>
					</IconButton>
					<IconButton>
						<FileUploadOutlinedIcon sx={{ color: "var(--deals-primary)" }} />
					</IconButton>
					<IconButton>
						<MoreHorizOutlinedIcon sx={{ color: "var(--deals-primary)" }} />
					</IconButton>
				</span>
			</div>
		</div>
	);
}

export default PostProfile;
