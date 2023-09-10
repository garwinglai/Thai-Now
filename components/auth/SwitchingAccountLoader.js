import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

function SwitchingAccountLoader({ isLoading }) {
  return (
    <Modal
      open={isLoading}
      aria-labelledby="loading modal title"
      aria-describedby="loading modal description"
    >
      <Box sx={style}>
        <div className="flex flex-col justify-center items-center gap-2">
          <p>Swtching Account</p>
          <CachedIcon />
        </div>
      </Box>
    </Modal>
  );
}

export default SwitchingAccountLoader;
