import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");

export const getLatLngFromAddress = (address) => {
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
