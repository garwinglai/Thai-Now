import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function PrivateProfileBreadcrumbs({ breadcrumb }) {
  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/"
          className="text-[color:var(--deals-primary)] font-light"
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/profile"
          className="text-[color:var(--deals-primary)] font-light"
        >
          Account
        </Link>
        <p className=" text-gray-400 font-light">{breadcrumb}</p>
      </Breadcrumbs>
    </div>
  );
}

export default PrivateProfileBreadcrumbs;
