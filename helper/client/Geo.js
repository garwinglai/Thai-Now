import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyDTcxR9M5UTt2L2uKkCBYDAIWfSOIFbwvg");
Geocode.setLanguage("en");

export const getLatLng = (address) => {
  return Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
};
