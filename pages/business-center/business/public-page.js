import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Image from "next/image";
import business_temp_img from "@/public/static/images/business_temp_img.png";
import PostProfile from "@/components/posts/PostProfile";
import PostContactInfo from "@/components/posts/PostContactInfo";
import PostOfferOptions from "@/components/posts/PostOfferOptions";
import PostDescription from "@/components/posts/PostDescription";
import PostLocation from "@/components/posts/PostLocation";
import BusinessHours from "@/components/business-center/BusinessHours";

function BusinessPublicPage() {
	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	return (
		<div className="pb-12">
			<button
				onClick={handleBack}
				className="flex items-center gap-1 bg-transparent pl-4 py-4"
			>
				<ChevronLeftIcon />
				<p className="text-[color:var(--deals-primary-med)] text-base">Back</p>
			</button>
			<div className="relative w-full h-80 inline-block">
				<Image
					src={business_temp_img}
					alt="business image"
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
				<PostProfile isPublicPage={true} />
				<PostContactInfo />
				<PostOfferOptions isPublicPage={true} />
				<PostDescription isPublicPage={true} />
				<PostLocation isPublicPage={true} />
				<BusinessHours />
			</div>
		</div>
	);
}

export default BusinessPublicPage;

BusinessPublicPage.getLayout = function getLayout(page) {
	return <MainLayout route="public-page">{page}</MainLayout>;
};
