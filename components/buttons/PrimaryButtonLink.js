import React from "react";
import Link from "next/link";

function PrimaryButtonLink({ route, name }) {
  return (
    <Link
      href={route}
      className="text-white rounded w-full h-full py-2 bg-[color:var(--secondary)] no-underline"
    >
      {name}
    </Link>
  );
}

export default PrimaryButtonLink;
