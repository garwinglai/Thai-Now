import React from "react";
import styles from "../../styles/components/home/guide-book-section.module.css";
import guideVideo from "../../public/static/images/home/guide-temp-video.png";
import Image from "next/image";
import GuidesCard from "./cards/GuidesCard";

function GuideBookSection({ isThaiHelpDirectory }) {
  return (
    <div className="md:px-[12%] md:flex md:items-start md:gap-4">
      <Image
        src={guideVideo}
        alt="guide video image"
        className="w-full md:w-1/2 md:h-auto md:object-cover"
      />
      <div className="flex w-full overflow-x-scroll p-4 gap-4 md:grid md:grid-cols-2 md:p-0 md:w-1/2">
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
