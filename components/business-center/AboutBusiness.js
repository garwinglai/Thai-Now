import React from "react";

function AboutBusiness({ isBusinessUser }) {
  return (
    <div className="">
      {isBusinessUser && (
        <div className="mb-4">
          <h5>About Business</h5>
          <p className="text-sm font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus provident modi rem, velit culpa eos consequatur nam
            labore. Vero possimus inventore necessitatibus maxime quaerat beatae
            voluptate non adipisci assumenda enim?
          </p>
        </div>
      )}
      <button className="border w-full text-sm py-2 rounded text-[color:var(--deals-primary)] font-light border-[color:var(--deals-primary)]">
        View Business Profile
      </button>
    </div>
  );
}

export default AboutBusiness;
