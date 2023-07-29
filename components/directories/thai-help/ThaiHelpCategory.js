import React from "react";
import basic_living_img from "@/public/static/images/directory/basic_living_img.png";
import business_investment from "@/public/static/images/directory/business_investment.png";
import health from "@/public/static/images/directory/health.png";
import kids from "@/public/static/images/directory/kids.png";
import learning from "@/public/static/images/directory/learning.png";
import living_permanently from "@/public/static/images/directory/living_permanently.png";
import moving_us from "@/public/static/images/directory/moving_us.png";
import thai_pride from "@/public/static/images/directory/thai_pride.png";
import transfer from "@/public/static/images/directory/transfer.png";
import travel from "@/public/static/images/directory/travel.png";
import CategoryCard from "./CategoryCard";
import CategorySearchResultHeader from "./CategorySearchResultHeader";
import Link from "next/link";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/router";

const categoryList = [
  {
    alt: "basic living",
    img: basic_living_img,
    text: "Basic living",
    color: "text-[color:var(--housing)]",
    bg: "bg-[color:var(--housing-bg)]",
  },
  {
    alt: "moving to united states",
    img: moving_us,
    text: "Moving to US",
    color: "text-[color:var(--moving)]",
    bg: "bg-[color:var(--moving-bg)]",
  },
  {
    alt: "living permanently image",
    img: living_permanently,
    text: "Living Permanently",
    color: "text-[color:var(--living)]",
    bg: "bg-[color:var(--living-bg)]",
  },
  {
    alt: "travel ",
    img: travel,
    text: "Travel",
    color: "text-[color:var(--travel)]",
    bg: "bg-[color:var(--travel-bg)]",
  },
  {
    alt: "learning ",
    img: learning,
    text: "Learning",
    color: "text-[color:var(--learning)]",
    bg: "bg-[color:var(--learning-bg)]",
  },
  {
    alt: "transfer ",
    img: transfer,
    text: "Transfer",
    color: "text-[color:var(--transfer)]",
    bg: "bg-[color:var(--transfer-bg)]",
  },
  {
    alt: "health ",
    img: health,
    text: "Health",
    color: "text-[color:var(--health)]",
    bg: "bg-[color:var(--health-bg)]",
  },
  {
    alt: "kids lin",
    img: kids,
    text: "Kids",
    color: "text-[color:var(--kids)]",
    bg: "bg-[color:var(--kids-bg)]",
  },
  {
    alt: "business and investment ",
    img: business_investment,
    text: "Business and Investment",
    color: "text-[color:var(--investment)]",
    bg: "bg-[color:var(--investment-bg)]",
  },
  {
    alt: "thai pride ",
    img: thai_pride,
    text: "Thai Pride",
    color: "text-[color:var(--pride)]",
    bg: "bg-[color:var(--pride-bg)]",
  },
];

function ThaiHelpCategory({ slug, title }) {
  const { push } = useRouter();

  const handleCreateConversationClick = () => {
    push("/thai-help/community/create");
  };

  return (
    <React.Fragment>
      <div className=" pt-4 w-screen bg-[color:var(--category-bg)]">
        {slug === "guide-book" ? (
          <div className="px-4 pt-2 pb-4 md:px-[10%]">
            <h3 className="text-[color:var(--deals-primary)]">{title}</h3>
            <p className="py-4 font-extralight">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
              eos quidem quod repellat modi quasi?
            </p>
          </div>
        ) : (
          <div className="md:px-[10%]">
            <div className="md:flex md:justify-between">
              <h4 className="hidden md:block">ThaiNow Community</h4>
              <div className="mx-4 mb-4 h-10 md:flex md:gap-4 md:mx-0">
                <Link
                  href="/thai-help/community/my-conversation"
                  className="hidden md:border md:border-[color:var(--deals-primary)] md:font-light md:text-[color:var(--deals-primary)] md:rounded md:text-sm md:flex md:items-center md:px-2"
                >
                  My Conversation
                </Link>
                <div>
                  <PrimaryButton
                    handleClick={handleCreateConversationClick}
                    name="New Conversation"
                  />
                </div>
              </div>
            </div>
            <h3 className="pl-4 text-[var(--deals-primary)] mb-4 md:pl-0">
              Category
            </h3>
          </div>
        )}

        <div className="flex flex-nowrap gap-4 overflow-x-auto pb-8 pl-4 md:px-[10%] md:grid md:grid-cols-5">
          {categoryList.map((listItem, idx) => {
            const category = listItem.text.toLowerCase().replace(" ", "-");
            const categoryRemoveSecondSpace = category.replace(" ", "-");

            return (
              <CategoryCard
                imgSrc={listItem.img}
                key={idx}
                imgAlt={listItem.alt}
                text={listItem.text}
                color={listItem.color}
                bg={listItem.bg}
                slug={slug}
                category={categoryRemoveSecondSpace}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ThaiHelpCategory;
