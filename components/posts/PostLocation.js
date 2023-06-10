import React from "react";

function PostLocation({ location, isPublicPage }) {
	return (
		<div className="p-4 bg-white">
			<h5>Location</h5>
			<div className="py-10 bg-gray-100 rounded-lg my-4">Map area later...</div>
			<p className="font-extralight">{location}</p>
			<button className="underline text-[color:var(--deals-primary)] ">
				Get Direction
			</button>
		</div>
	);
}

export default PostLocation;