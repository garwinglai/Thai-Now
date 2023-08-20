import React, { useState } from "react";
import Link from "next/link";
import { TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { useAuth } from "@/components/auth/AuthProvider";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ChangePassword() {
  const auth = getAuth();
  const user = auth.currentUser;

  const { authUser, loading } = useAuth();
  const { uid, email } = authUser || {};

  const [currentPass, setCurrentPass] = useState("");
  const [updateadPass, setUpdateadPass] = useState({
    newPass: "",
    newPassReEntered: "",
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { newPass, newPassReEntered } = updateadPass;

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertOpen(false);
  };

  const handleCurrentPassChange = async (e) => {
    const { value } = e.target;
    setCurrentPass(value);
  };

  const handleChangeNewPass = (e) => {
    const { name, value } = e.target;
    setUpdateadPass({ ...updateadPass, [name]: value });
  };

  const handleSaveChangePassword = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const { providerData } = user;
    const { providerId } = providerData[0];

    if (providerId === "google.com") {
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage(
        "You have signed up with Google. Please change your password in your Google account."
      );
      return;
    }

    if (currentPass === "" || newPass === "" || newPassReEntered === "") {
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage("Please fill in all fields.");
      return;
    }

    const credential = EmailAuthProvider.credential(email, currentPass);

    const authenticatedUser = await reauthenticateWithCredential(
      user,
      credential
    ).catch((err) => {
      console.log("err", err);
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage("Wrong password!");
      return { err };
    });

    const { err } = authenticatedUser;
    if (err) return;

    if (newPass !== newPassReEntered) {
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage("Passwords do not match.");
      return;
    }

    const newPassLength = newPass.length;
    if (newPassLength < 8 || newPassLength > 20) {
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage("Password must be 8-20 characters long.");
      return;
    }

    const error = await updatePassword(user, newPass).catch((error) => {
      console.log("error", error);
      setIsLoading(false);
      setIsAlertOpen(true);
      setAlertMessage("Could not update password.");
      return error;
    });

    setIsLoading(false);

    if (error) return;
  };

  return (
    <React.Fragment>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <h2 className="text-center my-4 lg:text-left lg:mb-0">Password</h2>
      <p className="font-light text-sm mb-6 lg:text-sm lg:font-extralight">
        You haven&apos;t set a password for ThaiNow yet. <br /> Set a password
        so that you can login to ThaiNow with just your email address.
      </p>
      <form onSubmit={handleSaveChangePassword} className="flex flex-col gap-6">
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
            value={currentPass}
            onChange={handleCurrentPassChange}
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
            value={newPass}
            name="newPass"
            onChange={handleChangeNewPass}
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
          name="newPassReEntered"
          value={newPassReEntered}
          onChange={handleChangeNewPass}
          size="small"
        />
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <CircularProgress color="warning" />
          </div>
        ) : (
          <button
            type="submit"
            className="bg-[color:var(--secondary)] text-white py-3 rounded text-sm lg:mt-8"
          >
            Save
          </button>
        )}
      </form>
    </React.Fragment>
  );
}

export default ChangePassword;
