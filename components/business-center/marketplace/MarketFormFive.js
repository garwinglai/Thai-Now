import React from "react";
import PostAmenities from "@/components/posts/PostAmenities";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostProfile from "@/components/posts/PostProfile";
import Image from "next/image";
import complete_post from "@/public/static/images/complete_post.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";
import CustomModal from "@/components/layouts/CustomModal";

function MarketFormFive({
	isBusinessUser,
	marketPostType,
	productDetails,
	isProductPhysical,
	productCondition,
	uploadedPhotos,
	priceOption,
	offerPrice,
	offerIncludesTax,
	isPublish,
	closeModal,
}) {
	const { title, description, location } = productDetails;
	const marketValues = {
		marketPostType,
		isProductPhysical,
		productCondition,
		priceOption,
		offerPrice,
		offerIncludesTax,
	};
	return (
		<form className="w-full">
			<h4 className="pt-4 px-4">Finish up and publish.</h4>{" "}
			<h3 className="text-[color:var(--deals-primary)] font-normal px-4 py-2">
				{title}
			</h3>
			<div className="relative w-full h-80 inline-block">
				<Image
					src={uploadedPhotos[0].imgUrl}
					alt={uploadedPhotos[0].fileName}
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
				<PostOfferOptions postType="marketplace" values={marketValues} />
				<PostDescription description={description} />
				<PostLocation location={location} />
			</div>
			<CustomModal isPublish={isPublish} onClose={closeModal}>
				<div className="flex flex-col items-center text-center gap-4">
					<Image src={complete_post} alt="complete post image" />
					<h4>Complete</h4>
					<p className="font-light">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officiis
						laborum labore quaerat beatae similique.
					</p>
					<PrimaryButton name="View your Post" />
					<Link
						href={` ${
							isBusinessUser
								? "/business-center/business"
								: "/business-center/classic"
						} `}
						className="underline font-light text-[color:var(--deals-primary)] "
					>
						Go to Business Center
					</Link>
				</div>
			</CustomModal>
		</form>
	);
}

export default MarketFormFive;
