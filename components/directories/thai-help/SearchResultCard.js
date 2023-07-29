import React from "react";
import Image from "next/image";
import thai_now_logo from "@/public/static/images/logos/logo_black.png";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { IconButton } from "@mui/material";
import Link from "next/link";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { useRouter } from "next/router";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import { More } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

const pid = "pid-thai-help";

function SearchResultCard({
  directory,
  slug,
  breadcrumbTitle,
  category,
  postId,
  myConversation,
}) {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const { push } = useRouter();

  const handleRouteClickTitle = () => {
    push(`/${directory}/${slug}/${category}`);
  };

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
    <div className="flex justify-between items-end border-b py-4">
      <div className="flex flex-col gap-2 relative">
        <button
          onClick={handleRouteClickTitle}
          className="w-fit underline text-[color:var(--deals-primary)] py-1 rounded font-light text-sm"
        >
          {breadcrumbTitle}
        </button>
        {myConversation && (
          <div className="absolute right-0 top-7">
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
                <Link
                  href="/thai-help/community/my-conversation/edit"
                  className="p-4 font-light"
                >
                  <p className="pl-4">Edit Conversation</p>
                </Link>
                <Link href="/" className="p-4 font-light">
                  <p className="pl-4">Delete Conversation</p>
                </Link>
              </div>
            </Drawer>
          </div>
        )}
        <Link href={`/${directory}/${slug}/${category}/${postId}`}>
          <h4 className="font-light text-base mb-6">Lorem ipsum dolor sit.</h4>

          <p className="font-extralight text-sm my-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
            reiciendis, animi maxime qui pariatur veritatis?
          </p>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src={thai_now_logo}
              alt="business logo"
              className="w-10 h-10 object-contain border rounded-full p-1 "
            />
            <button className="font-extralight text-sm underline">
              Thai Now
            </button>
            <p className="font-extralight text-sm"> - 23m ago</p>
          </div>
          <div className="flex gap-2">
            <div className="flex  items-center">
              <IconButton>
                <ThumbUpOutlinedIcon color="primary" fontSize="small" />
              </IconButton>
              <p className="font-extralight text-sm">15</p>
            </div>
            <div className="flex  items-center">
              <IconButton>
                <ChatOutlinedIcon color="primary" fontSize="small" />
              </IconButton>
              <p className="font-extralight text-sm">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultCard;
