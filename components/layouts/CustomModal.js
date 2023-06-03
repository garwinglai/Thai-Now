import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function CustomModal({ header, isPublish, onClose, children }) {
	if (!isPublish) return null;

	console.log(isPublish);

	return (
		<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center ">
			<div className="bg-white w-[400px] px-4 py-6 rounded">
				<div className="flex items-center justify-between">
					<h2>{header}</h2>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</div>
				<div className="modal-content">{children}</div>
			</div>
		</div>
	);
}

export default CustomModal;
