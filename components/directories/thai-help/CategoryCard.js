import Image from "next/image";
import React from "react";
import Link from "next/link";

function CategoryCard({ imgSrc, imgAlt, text, color, bg, slug, category }) {
  return (
    <Link
      href={`/thai-help/${slug}/${category}`}
      className={`${bg} rounded-lg min-w-[40%] pt-2 pb-4 pl-4 pr-8 shadow-lg`}
    >
      <div className="flex flex-col items-start text-left">
        <Image src={imgSrc} alt={imgAlt} />
        <p className={`${color} text-xs mt-2 font-light`}>{text}</p>
      </div>
    </Link>
  );
}

export default CategoryCard;
