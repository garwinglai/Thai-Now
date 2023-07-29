import React from "react";
import styles from "../../styles/components/home/guide-book-section.module.css";
import guideVideo from "../../public/static/images/home/guide-temp-video.png";
import Image from "next/image";
import GuidesCard from "./cards/GuidesCard";

function GuideBookSection({ isThaiHelpDirectory }) {
  return (
    <div className={`${styles.guide_book}`}>
      <Image
        src={guideVideo}
        alt="guide video image"
        className={`${styles.guide_video_image}`}
      />
      <div className={`${styles.guide_items_container}`}>
        <GuidesCard
          className={`${styles.item_1}`}
          isThaiHelpDirectory={isThaiHelpDirectory}
          postTitle="Basic living"
          postType="post"
          directory="thai-help"
          slug="guide-book"
          pid="1"
					category="basic-living"
        />
        <GuidesCard
          className={`${styles.item_2}`}
          isThaiHelpDirectory={isThaiHelpDirectory}
          postTitle="Basic living"
          postType="post"
          directory="thai-help"
          slug="guide-book"
          pid="1"
					category="basic-living"
        />
        <GuidesCard
          className={`${styles.item_3}`}
          isThaiHelpDirectory={isThaiHelpDirectory}
          postTitle="Basic living"
          postType="post"
          directory="thai-help"
          slug="guide-book"
          pid="1"
					category="basic-living"
        />
        <GuidesCard
          className={`${styles.item_4}`}
          isThaiHelpDirectory={isThaiHelpDirectory}
          postTitle="Basic living"
          postType="post"
          directory="thai-help"
          slug="guide-book"
          pid="1"
					category="basic-living"
        />
      </div>
    </div>
  );
}

export default GuideBookSection;
