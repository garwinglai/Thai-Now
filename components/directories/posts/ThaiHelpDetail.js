import React from "react";
import CategoryCard from "../thai-help/CategoryCard";
import SearchResultCard from "../thai-help/SearchResultCard";
import { useRouter } from "next/router";
import CategorySearchResultHeader from "../thai-help/CategorySearchResultHeader";
import thai_now_logo from "@/public/static/images/logos/logo_black.png";
import { IconButton } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Image from "next/image";
import boa_img from "@/public/static/images/temp/boa.png";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

function ThaiHelpDetail() {
	const [state, setState] = React.useState({
		bottom: false,
	});

	const { query } = useRouter();
	const { directory, pid } = query;

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
		<div className="px-4">
			<div className="flex justify-between items-end border-b pb-4">
				<div className="flex flex-col gap-2">
					<h4>Lorem ipsum dolor sit.</h4>
					<div className="flex items-center gap-2">
						<Image
							src={thai_now_logo}
							alt="business logo"
							className="w-10 h-10 object-contain border rounded-full p-1 "
						/>
						<p className="font-extralight text-sm">Thai Now - 23m ago</p>
					</div>
				</div>

				<div className="flex  items-center">
					<IconButton>
						<ThumbUpOutlinedIcon color="primary" fontSize="small" />
					</IconButton>
					<p className="font-extralight text-sm">15</p>
					<div className="ml-2">
						<IconButton onClick={toggleDrawer("bottom", true)}>
							<MoreHorizIcon />
						</IconButton>
						<Drawer
							anchor={"bottom"}
							open={state["bottom"]}
							onClose={toggleDrawer("bottom", false)}
						>
							<div className="w-full">
								<div className="text-right p-4 border-b">
									<IconButton onClick={toggleDrawer("bottom", false)}>
										<CloseIcon />
									</IconButton>
								</div>
								<Link href="/" className="p-4 font-light">
									<p className="pl-4">Report inappropriate Content</p>
								</Link>
							</div>
						</Drawer>
					</div>
				</div>
			</div>
			<div className="pt-4">
				{/* <p
					className={`${statusBackgroundColor} ${statusTextColor} w-fit px-3 py-1 rounded font-light text-sm`}
				>
					{statusText}
				</p> */}
				<p
					className={`bg-[color:var(--housing-bg)] text-[color:var(--housing)] w-fit px-3 py-1 rounded font-light text-sm mb-4`}
				>
					Basic living
				</p>
				<Image src={boa_img} alt="boa image" className="w-full object-cover" />
				<p className="font-light text-sm py-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
					praesentium temporibus sit vitae nisi, sequi ea quibusdam natus fugit.
					Modi, molestias enim repellendus asperiores assumenda excepturi
					quibusdam, totam consectetur voluptate optio laboriosam. Aut molestias
					ipsam sit nisi neque quae alias asperiores, eos hic dicta. Est fugit
					cumque repellendus dolor iure?
				</p>
				<Image src={boa_img} alt="boa image" className="w-full object-cover" />
				<p className="font-light text-sm py-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
					praesentium temporibus sit vitae nisi, sequi ea quibusdam natus fugit.
					Modi, molestias enim repellendus asperiores assumenda excepturi
					quibusdam, totam consectetur voluptate optio laboriosam. Aut molestias
					ipsam sit nisi neque quae alias asperiores, eos hic dicta. Est fugit
					cumque repellendus dolor iure?
				</p>
				<button className="border flex items-center w-full border-[color:var(--deals-primary)] mb-16 mt-4 rounded">
					<div className="flex justify-center items-center py-2 w-full gap-2">
						<ThumbUpOutlinedIcon color="primary" fontSize="small" />
						<p className="font-base text-sm text-[color:var(--deals-primary)]">
							Like this
						</p>
					</div>
				</button>
			</div>
		</div>
	);
}

export default ThaiHelpDetail;
