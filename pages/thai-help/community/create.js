import DirectoryHeader from "@/components/directories/DirectoryHeader";
import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

const guideTopics = [
  "All",
  "Basic living",
  "Moving to US",
  "Living permanently",
  "Travel",
  "Learning",
  "Transfer",
  "Health",
  "Kids",
  "Thai pride",
  "Business and investment",
];

function CreateConversation() {
  return (
    <div className="pt-14">
      <DirectoryHeader
        directory="Thai help"
        title="Community"
        slug="community"
        breadcrumbTitle="Create"
      />
      <div className="px-4">
        <h4 className="text-[color:var(--deals-primary)]">
          Start a conversation
        </h4>
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="title" className="text-[color:var(--deals-primary)]">
            Topic Name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="rounded border-none font-light text-sm text-[color:var(--deals-primary)] focus:ring-0 bg-[color:var(--input-bg-secondary)]"
          />
        </div>
        <textarea
          name="body"
          id="body"
          rows="10"
          className="w-full rounded border-[color:var(--gray-border)]"
          placeholder="input area"
        />
        <div className="mt-4 mb-12">
          <h5 className="text-[color:var(--deals-primary)] mt-8 mb-4">Category</h5>
          <RadioGroup
            aria-labelledby="housing-type-radio-group"
            name="housingType"
            // value={housingType}
            // onChange={handleHousingTypeChange}
          >
            {guideTopics.map((topic) => (
              <FormControlLabel
                key={topic}
                value={topic}
                control={<Radio />}
                label={<p className="font-extralight text-sm">{topic}</p>}
                labelPlacement="start"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#717171",
                  marginLeft: "0",
                }}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="anonymous"
              id="anonymous"
              className="w-5 h-5 rounded focus:ring-0"
            />
            <label htmlFor="anonymous" className="font-extralight">
              Post as anonymous
            </label>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="reply"
              id="reply"
              className="w-5 h-5 rounded focus:ring-0"
            />
            <label htmlFor="anonymous" className="font-extralight">
              Email me when someone replies
            </label>
          </div>
          <div className="flex gap-4 mt-2 mb-20">
            <SecondaryButton name="Cancel" />
            <PrimaryButton name="Post" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateConversation;

CreateConversation.getLayout = function getLayout(page) {
  return <MainLayout route="directory">{page}</MainLayout>;
};
