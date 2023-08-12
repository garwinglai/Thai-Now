import Geocode from "react-geocode";
import * as geofire from "geofire-common";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

const getLatLngFromAddress = (address) => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;

      return { lat, lng };
    },
    (error) => {
      console.error(error);
      // return { error };
    }
  );
};

export const createGeoHash = async (lat, lng) => {
  const hash = geofire.geohashForLocation([lat, lng]);
  return hash;
};

export default getLatLngFromAddress;
