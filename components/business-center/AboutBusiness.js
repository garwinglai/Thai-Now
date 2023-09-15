import React from "react";

function AboutBusiness({ isBusinessUser, userData }) {
  const { bizAboutUs } = isBusinessUser ? (userData ? userData : {}) : {};
  return (
    <div className="">
      {isBusinessUser && (
        <div className="mb-4">
          <h5>About Business</h5>
          <p className="text-sm font-extralight">{bizAboutUs}</p>
        </div>
      )}
      <button
        type="button"
        className="border w-full text-sm py-2 rounded text-[color:var(--deals-primary)] font-light border-[color:var(--deals-primary)]"
      >
        View Business Profile
      </button>
    </div>
  );
}

export default AboutBusiness;
