import React from "react";

function PrimaryButton({ name, handleClick, type }) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="text-white text-sm font-light rounded w-full h-full py-2 bg-[color:var(--secondary)] border border-transparent md:px-2"
    >
      {name}
    </button>
  );
}

export default PrimaryButton;
