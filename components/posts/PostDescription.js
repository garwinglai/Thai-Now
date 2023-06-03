import React from "react";

function PostDescription({ description }) {
	return (
		<div className="p-4 bg-white">
			<h5>Description</h5>
			<p className="font-extralight mt-4 whitespace-pre-line ">{description}</p>
		</div>
	);
}

export default PostDescription;
