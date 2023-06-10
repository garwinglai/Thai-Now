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
						<h6>Business type :</h6>
						<p className="font-extralight">Restaurant</p>
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
				<React.Fragment>
					<span className="flex items-center gap-3">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6>Property type :</h6>
						<p className="font-extralight">{housingType}</p>
					</span>
					<span className="flex items-center gap-3">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6>Guest(s) :</h6>
						<p className="font-extralight">{guestCount}</p>
					</span>
					<span className="flex items-center gap-3">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6>Bedrooms :</h6>
						<p className="font-extralight">{bedroomCount}</p>
					</span>
					<span className="flex items-center gap-3">
						<DirectionsCarIcon sx={{ color: "var(--secondary)" }} />
						<h6>Parking :</h6>
						<p className="font-extralight">{parkingCount}</p>
					</span>
					<span className="flex items-center gap-3">
						<ShowerIcon sx={{ color: "var(--secondary)" }} />
						<h6>Bathrooms :</h6>
						<p className="font-extralight">{bathroomCount}</p>
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
				</React.Fragment>
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
				<React.Fragment>
					<span className="flex items-center gap-3">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6>Type :</h6>
						<p className="font-extralight">{marketPostType}</p>
					</span>
					<span className="flex items-center gap-3">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6>Condition :</h6>
						<p className="font-extralight">{productCondition}</p>
					</span>
					<span className="flex items-center gap-3">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6>Physical Product :</h6>
						<p className="font-extralight">{isProductPhysical}</p>
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
					<p className="font-extralight">
						{offerIncludesTax === "Yes" ? "Includes tax" : "Tax not included"}
					</p>
				</React.Fragment>
			);
		}

		if (postType === "jobs") {
			const { jobValues, salaryRange, hasJobVisa } = values;
			const { title, jobLocation, experience, skills } = jobValues;
			const { minPrice, maxPrice, interval } = salaryRange;
			return (
				<React.Fragment>
					<span className="flex items-center gap-3">
						<MapsHomeWorkIcon sx={{ color: "var(--secondary)" }} />
						<h6>Job Position :</h6>
						<p className="font-extralight">{title}</p>
					</span>
					<span className="flex items-center gap-3">
						<PersonIcon sx={{ color: "var(--secondary)" }} />
						<h6>Job location :</h6>
						<p className="font-extralight">{jobLocation}</p>
					</span>
					<span className="flex items-center gap-3">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6>Experience :</h6>
						<p className="font-extralight">{experience}</p>
					</span>
					<span className="flex items-center gap-3">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6>Skills :</h6>
						<p className="font-extralight">{skills}</p>
					</span>
					<span className="flex items-center gap-3">
						<BedIcon sx={{ color: "var(--secondary)" }} />
						<h6>Visa (US only) :</h6>
						<p className="font-extralight">{hasJobVisa}</p>
					</span>

					<span className="flex mt-4">
						<h4 className="text-[color:var(--jobs-primary)] ">
							${minPrice}
							<span className="font-extralight"> - </span>${maxPrice}
							<span className="font-extralight">/{interval}</span>
						</h4>
					</span>
				</React.Fragment>
			);
		}
	}

	return <div className="p-4 bg-white">{displayPostOfferings(postType)}</div>;
}

export default PostOfferOptions;
