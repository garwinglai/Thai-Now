import React from "react";

function PrimaryButton({ name }) {
	return (
		<button className="text-white rounded w-full h-full py-2 bg-[color:var(--secondary)] ">
			{name}
		</button>
	);
}

export default PrimaryButton;
