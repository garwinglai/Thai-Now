import React from "react";
import PostLastUpdated from "./PostLastUpdated";

function PostAmenities({ amenities }) {
	const amenitiesKeysArray = Object.keys(amenities);
	console.log(amenitiesKeysArray);

	return (
		<div className="p-4 bg-white">
			<h5>Amenities</h5>
			<ul className="ml-4 my-4">
				{amenitiesKeysArray.map((item, key) => {
					if (amenities[item])
						return <li className="list-disc font-extralight">{item}</li>;
				})}
			</ul>
			<PostLastUpdated />
		</div>
	);
}

export default PostAmenities;
