import React, { useEffect, useState } from "react";
import loader from "@/utils/mapLoader";

function DirectoryMap({ address, userLocation, directory, allCoords }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loader.load().then(() => {
      if (!address) {
        initMapWithUserLocation(userLocation);
        return;
      }

      if (address) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            const center = address
              ? results[0].geometry.location
              : userLocation;
            const mapOptions = {
              center,
              zoom: 16,
            };

            const newMap = new window.google.maps.Map(
              document.getElementById("map"),
              mapOptions
            );

            for (let i = 0; i < allCoords.length; i++) {
              const coord = allCoords[i];
              const marker = new window.google.maps.Marker({
                position: coord,
                map: newMap,
              });
            }

            setMap(newMap);
          }
        });
      }
    });
  }, [address, allCoords, directory, userLocation]);

  const initMapWithUserLocation = (userLocation) => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: userLocation,
    });
    const geocoder = new window.google.maps.Geocoder();
    // const infowindow = new window.google.maps.InfoWindow();

    geocoder
      .geocode({ location: userLocation })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(16);

          // // let marker;
          // const marker = new google.maps.Marker({
          //   center: userLocation,
          //   map: map,
          // });

          for (let i = 0; i < allCoords.length; i++) {
            const coord = allCoords[i];

            const marker = new window.google.maps.Marker({
              position: coord,
              map: map,
            });
          }

          // infowindow.setContent(response.results[0].formatted_address);
          // infowindow.open(map, marker);
          setMap(map);
        } else {
          // window.alert("No results found");
        }
      })
      .catch((e) => console.log(e));
  };

  return <div id="map" className="h-[calc(100vh-165px)]"></div>;
}

export default DirectoryMap;
