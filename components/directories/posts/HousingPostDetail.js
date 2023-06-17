import React from "react";
import temp_image from "@/public/static/images/business_temp_img.png";
import Image from "next/image";
import PostProfile from "@/components/posts/PostProfile";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import RecommendedPosts from "./RecommendedPosts";
import PostReview from "./reviews/PostReview";

function HousingPostDetail() {
	const isLoggedIn = true;

	const values = {
		housingType: "Apartment",
		housingPrice: {
			exactPrice: {
				price: "1500",
				interval: "Month",
			},
			priceRange: {
				minPrice: "500",
				maxPrice: "750",
				interval: "Month",
			},
		},
		priceOption: "range",
		guestCount: 2,
		bedroomCount: 1,
		parkingCount: 1,
		bathroomCount: 1,
	};

	const description =
		"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa quibusdam, natus laborum aliquid laboriosam placeat. Minima dolores voluptates debitis voluptas quis voluptatibus iure fuga!";

	const location = "123 W Adams Blvd, Los Angeles";

	return (
		<div className=" w-full ">
			<h4 className="px-4 pb-4 text-[color:var(--deals-primary)]">
				Title of the post is written here.
			</h4>
			<div className="relative w-full h-80 inline-block">
				<Image
					src={temp_image}
					alt="images of the post"
					fill={true}
					className=" object-cover "
				/>
				<button
					type="button"
					className="absolute z-10 bg-opacity-50 bg-black text-white border border-white rounded px-4 py-2 right-4 bottom-4 "
				>
					+ 20 Photos
				</button>
			</div>
			<div className="flex flex-col gap-[1px] bg-[color:var(--border)] ">
				<PostProfile />
				<PostContactInfo />
				<PostOfferOptions postType="housing" values={values} />
				<PostDescription description={description} isLoggedIn={isLoggedIn} />
				{isLoggedIn && <PostLocation location={location} />}
				<PostReview />
				{/* <span className="h-32 bg-white"></span> */}
				<RecommendedPosts postType="Housing" />
			</div>
		</div>
	);
}

export default HousingPostDetail;
