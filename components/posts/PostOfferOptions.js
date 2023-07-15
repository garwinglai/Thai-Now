import React from "react";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";
import BedIcon from "@mui/icons-material/Bed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ShowerIcon from "@mui/icons-material/Shower";

function PostOfferOptions({ postType, values, isPublicPage }) {
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
			const {
				housingType,
				housingPrice,
				priceOption,
				guestCount,
				bedroomCount,
				parkingCount,
				bathroomCount,
			} = values;
			const { exactPrice, priceRange } = housingPrice;

			return (
				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Property type :</h6>
						<p className="font-extralight text-sm">{housingType}</p>
					</span>
					<span className="flex items-center gap-2">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Guest(s) :</h6>
						<p className="font-extralight text-sm">{guestCount}</p>
					</span>
					<span className="flex items-center gap-2">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Bedrooms :</h6>
						<p className="font-extralight text-sm">{bedroomCount}</p>
					</span>
					<span className="flex items-center gap-2">
						<DirectionsCarIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Parking :</h6>
						<p className="font-extralight text-sm">{parkingCount}</p>
					</span>
					<span className="flex items-center gap-2">
						<ShowerIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Bathrooms :</h6>
						<p className="font-extralight text-sm">{bathroomCount}</p>
					</span>
					{priceOption === "exact" && (
						<span className="flex mt-4">
							<h4 className="text-[color:var(--secondary)] ">
								${exactPrice.price}
								<span className="font-extralight">/{exactPrice.interval}</span>
							</h4>
						</span>
					)}
					{priceOption === "range" && (
						<span className="flex mt-4">
							<h4 className="text-[color:var(--secondary)] ">
								${priceRange.minPrice}
								<span className="font-extralight"> - </span>$
								{priceRange.maxPrice}
								<span className="font-extralight">/{priceRange.interval}</span>
							</h4>
						</span>
					)}
				</div>
			);
		}

		if (postType === "marketplace") {
			const {
				marketPostType,
				isProductPhysical,
				productCondition,
				priceOption,
				offerPrice,
				offerIncludesTax,
			} = values;
			const { exactPrice, priceRange } = offerPrice;

			return (
				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Type :</h6>
						<p className="font-extralight text-sm">{marketPostType}</p>
					</span>
					<span className="flex items-center gap-2">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Condition :</h6>
						<p className="font-extralight text-sm">{productCondition}</p>
					</span>
					<span className="flex items-center gap-2">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Physical Product :</h6>
						<p className="font-extralight text-sm">{isProductPhysical}</p>
					</span>
					{priceOption === "exact" && (
						<span className="flex mt-4">
							<h4 className="text-[color:var(--secondary)] ">
								${exactPrice.price}
								<span className="font-extralight">/{exactPrice.interval}</span>
							</h4>
						</span>
					)}
					{priceOption === "range" && (
						<span className="flex mt-4">
							<h4 className="text-[color:var(--secondary)] ">
								${priceRange.minPrice}
								<span className="font-extralight"> - </span>$
								{priceRange.maxPrice}
								<span className="font-extralight">/{priceRange.interval}</span>
							</h4>
						</span>
					)}
					<p className="font-extralight text-xs">
						{offerIncludesTax === "Yes" ? "Includes tax" : "Tax not included"}
					</p>
				</div>
			);
		}

		if (postType === "jobs") {
			const { jobValues, salaryRange, hasJobVisa } = values;
			const { title, jobLocation, experience, skills } = jobValues;
			const { minPrice, maxPrice, interval } = salaryRange;
			return (
				<div className="flex flex-col gap-2">
					<span className="flex items-center gap-2">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Job Position :</h6>
						<p className="font-extralight text-sm">{title}</p>
					</span>
					<span className="flex items-center gap-2">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Job location :</h6>
						<p className="font-extralight text-sm">{jobLocation}</p>
					</span>
					<span className="flex items-center gap-2">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Experience :</h6>
						<p className="font-extralight text-sm">{experience}</p>
					</span>
					<span className="flex items-center gap-2">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Skills :</h6>
						<p className="font-extralight text-sm">{skills}</p>
					</span>
					<span className="flex items-center gap-2">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6 className="text-sm">Visa (US only) :</h6>
						<p className="font-extralight text-sm">{hasJobVisa}</p>
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

	return <div className="p-4 bg-white lg:px-0 lg:pt-0">{displayPostOfferings(postType)}</div>;
}

export default PostOfferOptions;
