import React from "react";
import sushiShopImage from "@/public/static/images/home/sushiShopImage.svg";
import Image from "next/image";
import avatar_image from "../../public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import tripsImage from "@/public/static/images/home/trips-image.svg";

function Review() {
	const [rating, setRaing] = React.useState(4);

	return (
		<div className="py-4 border-b border-gray-100">
			<div className="flex justify-between gap-4">
				<h5 className="">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</h5>
				<Image
					src={sushiShopImage}
					alt="sushi shop image"
					className="w-16 h-16 rounded object-cover"
				/>
			</div>
			<div className="flex gap-2 items-center my-4">
				<Image src={avatar_image} alt="avatar image" className="w-14 h-14" />
				<div className="flex flex-col">
					<h4>Efrain E.</h4>
					<div className="flex gap-2 items-center">
						<Rating
							size="small"
							name="simple-controlled"
							value={rating}
							readOnly
						/>
						<p className="font-extralight text-gray-600">11 days ago</p>
					</div>
				</div>
			</div>
			<p className="font-extralight text-gray-600">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quas
				expedita, eos itaque suscipit optio exercitationem, maxime voluptatem
				dicta, tempora perspiciatis voluptatibus? Quidem, repellat ipsam!
			</p>
		</div>
	);
}

export default Review;
