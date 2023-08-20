import React, { useEffect, useState } from "react";
import loader from "@/utils/mapLoader";

function Map({ address }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const mapOptions = {
            center: results[0].geometry.location,
            zoom: 16,
          };
          const newMap = new window.google.maps.Map(
            document.getElementById("map"),
            mapOptions
          );
          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: newMap,
          });
          setMap(newMap);
        }
      });
    });
  }, [address]);

  return <div id="map" className="h-[calc(100vh-165px)]"></div>;
}

export default Map;
