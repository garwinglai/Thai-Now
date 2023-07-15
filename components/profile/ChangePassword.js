import React from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

function ChangePassword() {
  return (
    <React.Fragment>
      <h2 className="text-center my-4 lg:text-left lg:mb-0">Password</h2>
      <p className="font-light text-sm mb-6 lg:text-sm lg:font-extralight">
        You haven&apos;t set a password for ThaiNow yet. <br /> Set a password
        so that you can login to ThaiNow with just your email address.
      </p>
      <form className="flex flex-col gap-6">
        <div>
          <TextField
            fullWidth
            id="current-password"
            label="Current Password"
            variant="outlined"
            required
            type="password"
            color="warning"
            size="small"
          />
          <div className="text-right">
            <Link
              href="/auth/signin/forgot-password"
              className="  underline font-extralight text-sm text-[color:var(--deals-primary)]"
            >
              Forgot password
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <TextField
            fullWidth
            id="new-password"
            label="New Password"
            variant="outlined"
            required
            type="password"
            color="warning"
            size="small"
          />
          <div>
            <div className="flex items-center gap-2">
              <CancelIcon color="disabled" fontSize="small" />
              <p className="font-light text-xs text-[color:var(--text-body-color)]">
                Passwword must contain 8-20 characters
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CancelIcon color="disabled" fontSize="small" />
              <p className="font-light text-xs text-[color:var(--text-body-color)]">
                Contains letters, numbers, and special characters
              </p>
            </div>
          </div>
        </div>
        <TextField
          fullWidth
          id="reenter-password"
          label="Re-enter New Password"
          variant="outlined"
          required
          type="password"
          color="warning"
          size="small"
        />
        <button className="bg-[color:var(--secondary)] text-white py-3 rounded text-sm lg:mt-8">
          Save
        </button>
      </form>
    </React.Fragment>
  );
}

export default ChangePassword;
