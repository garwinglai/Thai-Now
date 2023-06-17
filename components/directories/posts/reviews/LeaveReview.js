import React, { useState } from "react";
import Image from "next/image";
import avatar_temp from "@/public/static/images/temp_avatar.png";
import Rating from "@mui/material/Rating";
import PrimaryButton from "@/components/buttons/PrimaryButton";

function LeaveReview() {
	const [ratingValue, setRatingValue] = useState(0);
	const [review, setReview] = useState("");

	const handleRatingChange = (e, newValue) => {
		setRatingValue(newValue);
	};

	const handleReviewChange = (e) => {
		const { value, name } = e.target;
		setReview(value);
	};

	return (
		<div className="border rounded my-4">
			<div className="flex items-center gap-4 px-6 pt-6">
				<Image
					src={avatar_temp}
					alt="image of reviewee"
					className="h-16 w-16 object-cover"
				/>
				<span className="flex flex-col">
					<p className="">James C.</p>
					<p className="font-light text-sm">Los Angeles</p>
				</span>
			</div>
			<div className="text-center py-6">
				<Rating
					name="simple-controlled"
					value={ratingValue}
					onChange={handleRatingChange}
					size="large"
				/>
				<p className="font-light text-[color:var(--deals-primary)]">
					Start your review
				</p>
			</div>
			<div className="px-4">
				<textarea
					onChange={handleReviewChange}
					value={review}
					name="review"
					id="review-text-area"
					rows="5"
					placeholder="Enter your review ..."
					className="p-2 rounded bg-[color:var(--input-bg-secondary)] text-sm placeholder:text-sm w-full"
				></textarea>
				<p className="font-extralight text-xs text-[color:var(--placeholder-color)] ">
					0/500
				</p>
			</div>
			<div className="mx-4 my-6">
				<PrimaryButton name="Add Comment" />
			</div>
		</div>
	);
}

export default LeaveReview;
