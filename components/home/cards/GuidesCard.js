import React from "react";
import styles from "../../../styles/components/home/cards/guides-card.module.css";
import guideImage from "../../../public/static/images/home/guide-temp-image.png";
import Image from "next/image";
import Link from "next/link";

function GuidesCard({
  isThaiHelpDirectory,
  directory,
  slug,
  category,
  postType,
  pid,
  postTitle,
}) {
  return (
    <div className={`${styles.guides_card}`}>
      <Link href={`/${directory}/${slug}/${category}/${postType}/${pid}`}>
        <Image
          src={guideImage}
          alt="guide book image"
          className={`${styles.guide_image}`}
        />
      </Link>
      {isThaiHelpDirectory ? (
        <div className="w-[300px]">
          <Link
            href={`/${directory}/${slug}/${category}`}
            className="underline font-light text-xs text-[color:var(--deals-primary)]"
          >
            {postTitle}
          </Link>
          <p className="font-medium text-sm"> Lorem ipsum dolor sit amet.</p>
        </div>
      ) : (
        <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
      )}
    </div>
  );
}

export default GuidesCard;
