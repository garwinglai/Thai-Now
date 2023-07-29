import React from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Drawer from "@mui/material/Drawer";
import ThaiHelpFilters from "../filters/thai-help/ThaiHelpFilters";

function CategorySearchResultHeader({ title }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-[var(--deals-primary)]">{title}</h3>
      <button
        onClick={toggleDrawer("bottom", true)}
        name="filter"
        id="filter"
        className="flex gap-6 items-center border rounded-full px-2 py-1 text-[color:var(--text-body-color)]"
      >
        <p className="font-light">Top</p>
        <KeyboardArrowDownOutlinedIcon fontSize="small" />
      </button>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <ThaiHelpFilters closeDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}

export default CategorySearchResultHeader;
