import React from "react";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";

function ReviewComponent() {
	return (
		<div className="pb-4 border-b border-[color:var(--border)]">
			<div className="flex justify-between items-center gap-4">
				<div className="flex gap-2 items-center my-4">
					<Image src={avatar_image} alt="avatar image" className="w-14 h-14" />
					<div className="flex flex-col">
						<h4>Efrain E.</h4>
						<div className="flex gap-2 items-center">
							<Rating
								name="size-small"
								value={5}
								sx={{ color: "var(--secondary)", fontSize: "10px" }}
								readOnly
							/>
							<p className="font-extralight text-xs text-gray-600">
								11 days ago
							</p>
						</div>
					</div>
				</div>
				<div className="">
					<IconButton>
						<MoreHorizIcon fontSize="small" />
					</IconButton>
				</div>
			</div>
			<p className="font-extralight text-xs text-gray-600">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, harum
				laboriosam non eveniet veritatis, obcaecati soluta porro necessitatibus
				commodi magni facere dolorem fugiat expedita! Deleniti.
			</p>
		</div>
	);
}

export default ReviewComponent;
