import React from "react";
import PostLastUpdated from "./PostLastUpdated";

function PostAmenities({ amenities, isOwner }) {
  const amenitiesKeysArray = isOwner
    ? Object.keys(amenities)
    : amenities.split(",");

  return (
    <div className="p-4 bg-white lg:pl-0">
      <h5>Amenities</h5>
      <ul className="ml-4 my-4 lg:ml-6 lg:grid lg:grid-cols-3">
        {amenitiesKeysArray.map((item, key) => {
          if (isOwner) {
            if (amenities[item])
              return (
                <li key={key} className="list-disc font-extralight">
                  {item}
                </li>
              );
          } else {
            return (
              <li key={key} className="list-disc font-extralight">
                {item}
              </li>
            );
          }
        })}
      </ul>
      <PostLastUpdated />
    </div>
  );
}

export default PostAmenities;
