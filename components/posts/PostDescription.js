import React from "react";

function PostDescription({ description, isPublicPage }) {
	return (
		<div className="p-4 bg-white">
			<h5>{isPublicPage ? "About Business" : "Description"}</h5>
			<p className="font-extralight mt-4 whitespace-pre-line ">
				{isPublicPage
					? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati id tenetur magni deleniti sint libero voluptate ut quis officia blanditiis, amet, iusto ex."
					: description}
			</p>
		</div>
	);
}

export default PostDescription;
