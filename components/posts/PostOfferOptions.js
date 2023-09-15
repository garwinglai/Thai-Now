import React from "react";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";
import BedIcon from "@mui/icons-material/Bed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";

function PostOfferOptions({
  postType,
  postData,
  isPublicPage,
  isPostReview,
  values,
}) {
  function displayPostOfferings(postType) {
    if (isPublicPage) {
      return (
        <React.Fragment>
          <span className="flex items-center gap-3">
            <MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Business type :</h6>
            <p className="font-extralight text-sm">Restaurant</p>
          </span>
        </React.Fragment>
      );
    }

    if (postType === "housing") {
      let propertyType;
      let guestNumber;
      let bedroomNumber;
      let parkingNumber;
      let bathroomNumber;
      let priceInterval;
      let postPrice;
      let priceOptions;
      let exactRange;
      let priceRange;

      if (isPostReview) {
        const {
          housingType,
          housingPrice,
          priceOption,
          guestCount,
          bedroomCount,
          parkingCount,
          bathroomCount,
        } = values;

        propertyType = housingType;
        guestNumber = guestCount;
        bedroomNumber = bedroomCount;
        parkingNumber = parkingCount;
        bathroomNumber = bathroomCount;
        priceOptions = priceOption;
        postPrice = housingPrice;
        exactRange = housingPrice.exactPrice;
        priceRange = housingPrice.priceRange;
        priceInterval =
          priceOptions === "exact" ? exactRange.interval : priceRange.interval;
      } else {
        const {
          propertyTypeDisplay,
          guestNum,
          bedroomNum,
          parkingNum,
          bathroomNum,
          price,
          pricePer,
        } = postData ? postData : {};

        propertyType = propertyTypeDisplay;
        guestNumber = guestNum;
        bedroomNumber = bedroomNum;
        parkingNumber = parkingNum;
        bathroomNumber = bathroomNum;
        postPrice = price;
        priceInterval =
          pricePer == 0
            ? "day"
            : pricePer == 1
            ? "week"
            : pricePer == 2
            ? "month"
            : "year";
      }

      return (
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Property type :</h6>
            <p className="font-extralight text-sm">{propertyType}</p>
          </span>
          <span className="flex items-center gap-2">
            <PersonIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Guest(s) :</h6>
            <p className="font-extralight text-sm">{guestNumber}</p>
          </span>
          <span className="flex items-center gap-2">
            <BedIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Bedrooms :</h6>
            <p className="font-extralight text-sm">{bedroomNumber}</p>
          </span>
          <span className="flex items-center gap-2">
            <DirectionsCarIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Parking :</h6>
            <p className="font-extralight text-sm">{parkingNumber}</p>
          </span>
          <span className="flex items-center gap-2">
            <ShowerIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Bathrooms :</h6>
            <p className="font-extralight text-sm">{bathroomNumber}</p>
          </span>

          {isPostReview ? (
            <div>
              {priceOptions === "exact" ? (
                <span className="flex mt-4">
                  <h4 className="text-[color:var(--secondary)] ">
                    ${exactRange.price}
                    <span className="font-extralight">
                      /{exactRange.interval}
                    </span>
                  </h4>
                </span>
              ) : (
                <span className="flex mt-4">
                  <h4 className="text-[color:var(--secondary)] ">
                    ${priceRange.minPrice}
                    <span className="font-extralight"> - </span>$
                    {priceRange.maxPrice}
                    <span className="font-extralight">
                      /{priceRange.interval}
                    </span>
                  </h4>
                </span>
              )}
            </div>
          ) : (
            <span className="flex mt-4">
              <h4 className="text-[color:var(--secondary)] ">
                {postPrice}
                <span className="font-extralight">/{priceInterval}</span>
              </h4>
            </span>
          )}
        </div>
      );
    }

    if (postType === "marketplace") {
      let postType;
      let productPhysicalOrNot;
      let conditionOfProduct;
      let priceOptions;
      let postPrice;
      let isTaxRequired;
      let exactRange;
      let priceRange;

      if (isPostReview) {
        const {
          marketPostType,
          isProductPhysical,
          productCondition,
          priceOption,
          offerPrice,
          offerIncludesTax,
        } = values;

        postType = marketPostType;
        productPhysicalOrNot = isProductPhysical;
        conditionOfProduct = productCondition;
        priceOptions = priceOption;
        postPrice = offerPrice;
        isTaxRequired = offerIncludesTax;
        exactRange = offerPrice.exactPrice;
        priceRange = offerPrice.priceRange;
      } else {
        const {
          offerTypeDisplay,
          physicalProduct,
          conditionDisplay,
          price,
          includeTax,
        } = postData;
        postType = offerTypeDisplay;
        productPhysicalOrNot = physicalProduct === 1 ? "Yes" : "No";
        conditionOfProduct = conditionDisplay;
        postPrice = price;
        isTaxRequired = includeTax === 0 ? "Yes" : "No";
      }

      return (
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Type :</h6>
            <p className="font-extralight text-sm">{postType}</p>
          </span>
          <span className="flex items-center gap-2">
            <PersonIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Condition :</h6>
            <p className="font-extralight text-sm">{conditionOfProduct}</p>
          </span>
          <span className="flex items-center gap-2">
            <BedIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Physical Product :</h6>
            <p className="font-extralight text-sm">{productPhysicalOrNot}</p>
          </span>
          {isPostReview ? (
            <div>
              {priceOptions === "exact" ? (
                <span className="flex mt-4">
                  <h4 className="text-[color:var(--secondary)] ">
                    ${exactRange.price}
                  </h4>
                </span>
              ) : (
                <span className="flex mt-4">
                  <h4 className="text-[color:var(--secondary)] ">
                    ${priceRange.minPrice}
                    <span className="font-extralight"> - </span>$
                    {priceRange.maxPrice}
                  </h4>
                </span>
              )}
            </div>
          ) : (
            <span className="flex mt-4">
              <h4 className="text-[color:var(--secondary)] ">{postPrice}</h4>
            </span>
          )}
          <p className="font-extralight text-xs">
            {isTaxRequired === "Yes" ? "Includes tax" : "Tax not included"}
          </p>
        </div>
      );
    }

    if (postType === "jobs") {
      const { jobValues, salaryRange, hasJobVisa } = values;
      const { postTitle, jobLocation, workExperience, skills } = jobValues;
      const { minPrice, maxPrice, interval } = salaryRange;
      return (
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2">
            <MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Job Position :</h6>
            <p className="font-extralight text-sm">{postTitle}</p>
          </span>
          <span className="flex items-center gap-2">
            <PersonIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Job location :</h6>
            <p className="font-extralight text-sm">{jobLocation}</p>
          </span>
          <span className="flex items-center gap-2">
            <BedIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Experience :</h6>
            <p className="font-extralight text-sm">{workExperience}</p>
          </span>
          <span className="flex items-center gap-2">
            <BedIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Skills :</h6>
            <p className="font-extralight text-sm">{skills}</p>
          </span>
          <span className="flex items-center gap-2">
            <BedIcon sx={{ color: "var(--secondary)" }} />
            <h6 className="text-sm">Visa (US only) :</h6>
            <p className="font-extralight text-sm">
              {hasJobVisa ? `not required` : `required`}
            </p>
          </span>

          <span className="flex mt-2">
            <h4 className="text-[color:var(--jobs-primary)] ">
              ${minPrice}
              <span className="font-extralight"> - </span>${maxPrice}
              <span className="font-extralight">/{interval}</span>
            </h4>
          </span>
        </div>
      );
    }
  }

  return (
    <div className="p-4 bg-white lg:px-0 lg:pt-0">
      {displayPostOfferings(postType)}
    </div>
  );
}

export default PostOfferOptions;
