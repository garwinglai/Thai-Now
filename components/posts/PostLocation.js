import React from "react";
import Map from "../directories/Map";

function PostLocation({ location, isPublicPage }) {
  const handleOpenGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;

    window.open(googleMapsUrl, "_blank");
  };
  return (
    <div className="p-4 bg-white lg:px-0">
      <h5>Location</h5>
      <div>
        <Map address={location} />
      </div>
      <div className="lg:flex lg:justify-between mt-4">
        <p className="font-extralight text-sm">{location}</p>
        <button
          onClick={handleOpenGoogleMaps}
          className="font-base underline text-sm text-[color:var(--deals-primary)] "
        >
          Get Direction
        </button>
      </div>
    </div>
  );
}

export default PostLocation;
