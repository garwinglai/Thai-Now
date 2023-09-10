import React, { useEffect, useState } from "react";
import LeaveReview from "./LeaveReview";
import ReviewStats from "./ReviewStats";
import ReviewComponent from "./ReviewComponent";
import { useAuth } from "@/components/auth/AuthProvider";
import { db } from "@/firebase/fireConfig";
import { doc, onSnapshot, collection } from "firebase/firestore";

function PostReview({ userId, pid }) {
  const { authUser, loading } = useAuth();
  const { uid } = authUser || {};

  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const allReviewsRef = collection(db, "allReviews");
    const unsubListenAllReviews = onSnapshot(allReviewsRef, (querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;

        allData.push(data);
      });
      setAllReviews(allData);
    });

    return () => {
      unsubListenAllReviews();
    };
  }, []);

  return (
    <div className="bg-white p-4">
      <h4 className="my-4">Customer Reviews</h4>
      {uid && uid !== userId && <LeaveReview userId={userId} pid={pid} />}
      <ReviewStats />
      {allReviews.map((reviewData) => {
        const { id } = reviewData;
        return <ReviewComponent key={id} reviewData={reviewData} />;
      })}

      <button className="w-full bg-[color:var(--gray-btn)] py-2 rounded font-light text-sm my-4">
        See more reviews.
      </button>
    </div>
  );
}

export default PostReview;
