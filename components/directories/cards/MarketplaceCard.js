import React from "react";
import styles from "../../../styles/components/directory/cards/marketplace-card.module.css";
import massageImage from "../../../public/static/images/directory/massage_large.png";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { yellow } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

const pid = "pid-marketplace";

function MarketplaceCard({ isBusinessCenter, isBusinessUser, directory }) {
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
    <div className="relative">
      <Link
        href={`/${directory}/${pid}`}
        className={`${styles.jobs_card_container} ${styles.flex}`}
      >
        <div className={`${styles.image_box}`}>
          <Image
            src={massageImage}
            alt="massage image"
            className={`${styles.card_image}`}
          />
        </div>
        <div className={`${styles.card_context_box} ${styles.flexCol}`}>
          <div className={`${styles.context_box_top}`}>
            <div className={`${styles.flex} ${styles.review_box}`}>
              <StarIcon style={{ color: yellow[700] }} fontSize="small" />
              <p>4.69</p>
              <p className={`${styles.review_count_p}`}>{`(20 Reviews)`}</p>
            </div>
            <h4>Lorem Ipsum is simply dummy</h4>
            <p className={`${styles.business_location_p}`}>Los Angeles</p>
            <div className={`${styles.business_type} ${styles.flex}`}>
              <span>•</span>
              <p>Restaurant</p>
            </div>
            <div className={`${styles.negotiate_price}`}>
              <p>Negotiate Price</p>
            </div>
          </div>
          <div className={`${styles.context_box_bottom}`}>
            <p className={`${styles.days_ago_p}`}>29 days ago</p>
          </div>
        </div>
      </Link>
      {isBusinessCenter && (
        <div className="absolute top-4 right-0">
          <IconButton onClick={toggleDrawer("bottom", true)}>
            <MoreVertIcon />
          </IconButton>
          <Drawer
            anchor={"bottom"}
            open={state["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            <div className="flex flex-col p-4 pb-8 rounded-t">
              <div className="flex justify-between items-center text-right border-b border-gray-50 pb-4 mb-4">
                <h4>Post Actions</h4>
                <IconButton onClick={toggleDrawer("bottom", false)}>
                  <CloseIcon className="text-black" />
                </IconButton>
              </div>
              <Link
                href={`${
                  isBusinessUser
                    ? `/business-center/business/edit/marketplace/${pid}`
                    : `/business-center/classic/edit/marketplace/${pid}`
                }`}
                className="font-light text-base text-gray-700 mb-4"
              >
                Edit post
              </Link>
              <button className="font-light w-fit text-base text-gray-700">
                Delete post
              </button>
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
}

export default MarketplaceCard;
