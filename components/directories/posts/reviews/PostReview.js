import React from "react";
import LeaveReview from "./LeaveReview";
import ReviewStats from "./ReviewStats";
import ReviewComponent from "./ReviewComponent";

function PostReview() {
	return (
		<div className="bg-white p-4">
			<h4 className="my-4">Customer Reviews</h4>
			<LeaveReview />
			<ReviewStats />
			<ReviewComponent />
			<ReviewComponent />
			<ReviewComponent />
			<button className="w-full bg-[color:var(--gray-btn)] py-2 rounded font-light text-sm my-4">
				See more reviews.
			</button>
		</div>
	);
}

export default PostReview;
