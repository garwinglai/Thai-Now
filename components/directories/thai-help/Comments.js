import React from "react";
import sushiShopImage from "@/public/static/images/home/sushiShopImage.svg";
import Image from "next/image";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import tripsImage from "@/public/static/images/home/trips-image.svg";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { IconButton } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

function Comments() {
  const [state, setState] = React.useState({
    bottom: false,
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
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center my-4">
          <Image src={avatar_image} alt="avatar image" className="w-14 h-14" />
          <div className="flex flex-col">
            <h4>Efrain E.</h4>
            <p className="font-extralight text-gray-600">11 days ago</p>
          </div>
        </div>
        <IconButton onClick={toggleDrawer("bottom", true)}>
          <MoreHorizSharpIcon sx={{ color: "var(--deals-primary)" }} />
        </IconButton>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          <div className="w-full">
            <div className="text-right px-4 py-2 border-b">
              <IconButton onClick={toggleDrawer("bottom", false)}>
                <CloseIcon />
              </IconButton>
            </div>
            <Link href="/" className="p-4 font-light">
              <p className="pl-4">Edit Conversation</p>
            </Link>
            <Link href="/" className="p-4 font-light">
              <p className="pl-4">Delete Conversation</p>
            </Link>
          </div>
        </Drawer>
      </div>
      <p className="font-extralight text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas
        expedita, eos itaque suscipit optio exercitationem, maxime voluptatem
        dicta, tempora perspiciatis voluptatibus? Quidem, repellat ipsam!
      </p>
      <div className="flex justify-end gap-2">
        <div className="flex  items-center">
          <IconButton>
            <ThumbUpOutlinedIcon
              sx={{ color: "var(--deals-primary)" }}
              fontSize="small"
            />
          </IconButton>
          <button className="font-extralight text-sm text-[color:var(--deals-primary)]">
            0
          </button>
        </div>
        <div className="flex  items-center">
          <IconButton>
            <ReplyOutlinedIcon
              color="primary"
              fontSize="small"
              sx={{ color: "var(--deals-primary)" }}
            />
          </IconButton>
          <button className="font-extralight text-sm text-[color:var(--deals-primary)]">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
