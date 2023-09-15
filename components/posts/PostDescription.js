import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import PrimaryButton from "../buttons/PrimaryButton";

function PostDescription({
  description,
  isPublicPage,
  authUser,
  postType,
  jobContactMethodEmail,
  jobContactMethodInPerson,
  jobContactMethodPhone,
}) {
  const { push } = useRouter();

  const handleLoginClick = () => {
    push("/auth/signin");
  };

  return (
    <div className="p-4 bg-white w-full lg:px-0">
      <h5>{isPublicPage ? "About Business" : "Description"}</h5>
      {authUser ? (
        <div>
          <p className="font-extralight mt-4 whitespace-pre-line text-sm">
            {isPublicPage
              ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio obcaecati id tenetur magni deleniti sint libero voluptate ut quis officia blanditiis, amet, iusto ex."
              : description}
          </p>
          <h5 className="mt-4">To submit interest for this position:</h5>
          {jobContactMethodEmail && (
            <p className="font-extralight mt-2 whitespace-pre-line text-sm">
              Send us an email.
            </p>
          )}
          {jobContactMethodPhone && (
            <p className="font-extralight mt-2 whitespace-pre-line text-sm">
              Contact us by phone.
            </p>
          )}
          {jobContactMethodInPerson && (
            <p className="font-extralight mt-2 whitespace-pre-line text-sm">
              Visit us at our location.
            </p>
          )}
        </div>
      ) : (
        <div className="w-ful">
          <p className="text-sm font-extralight my-4">
            Please login for more information.
          </p>
          <PrimaryButton name="Log in" handleClick={handleLoginClick} />
        </div>
      )}
    </div>
  );
}

export default PostDescription;
