import React from "react";
import { IconButton } from "@mui/material";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

function JobsFormFive({
  jobContactMethodEmail,
  jobContactMethodPhone,
  jobContactMethodInPerson,
  handleContactEmailChange,
  handleContactInPersonChange,
  handleContactPhoneChange,
  userData,
}) {
  const { email, fullAddress, phoneNum } = userData;
  return (
    <form className="p-4 lg:w-1/2 lg:mx-auto">
      <h4 className="pt-4">How do you get your customers to contact you?</h4>
      <FormGroup
        sx={{ marginRight: "0.5rem", marginTop: "1rem", gap: "1.5rem" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={jobContactMethodEmail}
              onChange={handleContactEmailChange}
              name="kitchen"
            />
          }
          label={
            <div>
              <p className=" text-[color:var(--label-color)] font-extralight ">
                Email
              </p>
              <p className=" text-[color:var(--deals-primary)] font-extralight ">
                {email}
              </p>
            </div>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={jobContactMethodPhone}
              onChange={handleContactPhoneChange}
              name="wifi"
            />
          }
          label={
            <div>
              <p className=" text-[color:var(--label-color)] font-extralight ">
                Phone / Appointment
              </p>
              <p className=" text-[color:var(--deals-primary)] font-extralight ">
                {phoneNum}
              </p>
            </div>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={jobContactMethodInPerson}
              onChange={handleContactInPersonChange}
              name="tv"
            />
          }
          label={
            <div>
              <p className=" text-[color:var(--label-color)] font-extralight ">
                Walk-in (in-person)
              </p>
              <p className=" text-[color:var(--deals-primary)] font-extralight ">
                {fullAddress}
              </p>
            </div>
          }
          labelPlacement="start"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "0",
          }}
        />
      </FormGroup>
    </form>
  );
}

export default JobsFormFive;
