import React from "react";

function PrimaryButton({ name, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="text-white text-sm font-light rounded w-full h-full py-2 bg-[color:var(--secondary)] border border-transparent "
    >
      {name}
    </button>
  );
}

export default PrimaryButton;
