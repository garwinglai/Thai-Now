import React from "react";

function SecondaryButton({ name, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="text-[color:var(--deals-primary)] text-sm font-light rounded w-full h-full py-2 bg-white border border-[color:var(--deals-primary)]"
    >
      {name}
    </button>
  );
}

export default SecondaryButton;
