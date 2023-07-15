import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function BusinessCenterDesktopBreadcrumbs() {
  const handleClick = (event) => {
    event.preventDefault();
  };
  return (
    <div role="presentation" onClick={handleClick} className="bg-white">
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          className="text-[color:var(--deals-primary)] font-light"
        >
          Home
        </Link>
        <p className=" text-gray-400 font-light">Public page</p>
      </Breadcrumbs>
    </div>
  );
}

export default BusinessCenterDesktopBreadcrumbs;
