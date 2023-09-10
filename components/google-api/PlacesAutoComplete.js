import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

function PlacesAutoComplete({ onAddressSelect }) {
  const {
    ready,
    value,
    suggestions: { status, data }, // results from Google Places API for the given search term
    setValue, // use this method to link input value with the autocomplete hook
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here {componentRestrictions: { country: 'us' }} restrict search to US */
    },
    debounce: 300,
    cache: 86400,
  });

  console.log("ready", ready);
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    const { value } = e.target;
    // Update the keyword of the input element
    setValue(value);
    // setDeliveryAddress(value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      onAddressSelect(description);

      // Get latitude and longitude via utility functions
      // getGeocode({ address: description }).then((results) => {
      //   const { lat, lng } = getLatLng(results[0]);
      //   console.log("📍 Coordinates: ", { lat, lng });
      // });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="border-b py-2 px-6"
        >
          <p className="text-sm">{main_text}</p>{" "}
          <p className="text-sm font-extralight">{secondary_text}</p>
        </li>
      );
    });

  return (
    <div ref={ref} className="relative flex-grow">
      <label
        htmlFor="deliveryAddress"
        className="absolute flex items-center gap-2 top-[12px] left-4 text-[color:var(--brown-text)] font-light text-sm"
      >
        <LocationOnOutlinedIcon fontSize="small" />
      </label>
      <input
        type="text"
        name="deliveryAddress"
        id="deliveryAddress"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        // value={deliveryAddress}
        // onChange={handleDeliveryAddressChange}
        placeholder="Enter address"
        className=" border-none rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-10 py-2 "
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}

export default PlacesAutoComplete;
