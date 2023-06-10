import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import MarketFormOne from "@/components/business-center/marketplace/MarketFormOne";
import MarketFormTwo from "@/components/business-center/marketplace/MarketFormTwo";
import MarketFormThree from "@/components/business-center/marketplace/MarketFormThree";
import MarketFormFour from "@/components/business-center/marketplace/MarketFormFour";
import MarketFormFive from "@/components/business-center/marketplace/MarketFormFive";
import Snackbar from "@mui/material/Snackbar";
import { Alert, IconButton } from "@mui/material";

function MarketplacePostBusinessUser() {
	const [isPublish, setIsPublish] = useState(false);
	const [step, setStep] = useState(1);
	const [marketPostType, setMarketPostType] = useState("Product");
	const [productDetails, setProductDetails] = useState({
		title: "",
		productType: "Food",
		description: "",
		location: "",
	});
	const [isProductPhysical, setIsProductPhysical] = useState("Yes");
	const [productCondition, setProductCondition] = useState("Used");
	const [uploadedPhotos, setUploadedPhotos] = useState([]);
	const [priceOption, setPriceOption] = useState("exact");
	const [offerPrice, setOfferPrice] = useState({
		exactPrice: { price: "", interval: "week" },
		priceRange: { minPrice: "", maxPrice: "", interval: "week" },
	});
	const [offerIncludesTax, setOfferIncludesTax] = useState("Yes");
	const [snackBar, setSnackBar] = useState({
		isSnackBarOpen: false,
		snackMessage: "",
	});

	const { title, description, location, productType } = productDetails;
	const { isSnackBarOpen, snackMessage } = snackBar;
	const { exactPrice, priceRange } = offerPrice;

	const { back } = useRouter();

	const handleBack = () => {
		if (step === 1) {
			back();
		} else {
			setStep((prev) => (prev -= 1));
		}
	};

	const handleNext = () => {
		if (step === 2) {
			if (title === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Missing title.",
				}));
				return;
			}

			if (uploadedPhotos.length === 0) {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Photos required.",
				}));
				return;
			}

			if (description === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Missing description.",
				}));
				return;
			}

			if (location === "") {
				setSnackBar((prev) => ({
					isSnackBarOpen: true,
					snackMessage: "Location required.",
				}));
				return;
			}
		}

		if (step === 4) {
			if (priceOption === "exact") {
				if (exactPrice.price === "") {
					setSnackBar((prev) => ({
						isSnackBarOpen: true,
						snackMessage: "Please enter a price.",
					}));
					return;
				}
			}
			if (priceOption === "range") {
				if (priceRange.minPrice === "" || priceRange.maxPrice === "") {
					setSnackBar((prev) => ({
						isSnackBarOpen: true,
						snackMessage: "Please enter a price range.",
					}));
					return;
				}
			}
		}

		if (step === 5) {
			setIsPublish(true);
			return;
		}

		setStep((prev) => (prev += 1));
	};

	const closeModal = () => {
		setIsPublish(false);
	};

	const handleCloseSnackBar = () => {
		setSnackBar({ isSnackBarOpen: false, snackMessage: "" });
	};

	const handleChangeMarketPostType = (e) => {
		setMarketPostType(e.target.value);
	};

	const handleProductPhysicalChange = (e) => {
		setIsProductPhysical(e.target.value);
	};

	const handleProductCondition = (e) => {
		setProductCondition(e.target.value);
	};

	const handleProductValueChange = (e) => {
		const { name, value } = e.target;
		setProductDetails((prev) => ({ ...prev, [name]: value }));
	};

	const handleTaxChange = (e) => {
		setOfferIncludesTax(e.target.value);
	};

	const handlePriceOption = (e) => {
		const { value } = e.target;
		console.log(value);
		setPriceOption(value);
	};

	const handleChangePrice = (e) => {
		const { name, value } = e.target;
		console.log(priceOption);
		if (priceOption === "exact") {
			console.log("hi");
			setOfferPrice((prev) => ({
				exactPrice: { ...prev.exactPrice, [name]: value },
				priceRange: { minPrice: "", maxPrice: "", interval: "week" },
			}));
		}
		if (priceOption === "range") {
			console.log(name, value);
			setOfferPrice((prev) => ({
				exactPrice: { price: "", interval: "week" },
				priceRange: { ...prev.priceRange, [name]: value },
			}));
		}
	};

	const handlePhotoFileChange = (e) => {
		const selectedImage = e.target.files[0];
		const fileName = selectedImage.name;
		const imgUrl = URL.createObjectURL(selectedImage);
		const imgData = { imgUrl, fileName };

		if (!uploadedPhotos.includes(imgData))
			setUploadedPhotos((prev) => [...prev, imgData]);
	};

	const displayHousingPostForms = (step) => {
		if (step === 1)
			return (
				<MarketFormOne
					marketPostType={marketPostType}
					handleChangeMarketPostType={handleChangeMarketPostType}
				/>
			);
		if (step === 2)
			return (
				<MarketFormTwo
					productDetails={productDetails}
					handleProductValueChange={handleProductValueChange}
					uploadedPhotos={uploadedPhotos}
					handlePhotoFileChange={handlePhotoFileChange}
				/>
			);
		if (step === 3)
			return (
				<MarketFormThree
					isProductPhysical={isProductPhysical}
					productCondition={productCondition}
					handleProductCondition={handleProductCondition}
					handleProductPhysicalChange={handleProductPhysicalChange}
				/>
			);
		if (step === 4)
			return (
				<MarketFormFour
					handlePriceOption={handlePriceOption}
					priceOption={priceOption}
					handleTaxChange={handleTaxChange}
					offerIncludesTax={offerIncludesTax}
					handleChangePrice={handleChangePrice}
					offerPrice={offerPrice}
				/>
			);
		if (step === 5)
			return (
				<MarketFormFive
					isBusinessUser={true}
					marketPostType={marketPostType}
					productDetails={productDetails}
					isProductPhysical={isProductPhysical}
					productCondition={productCondition}
					uploadedPhotos={uploadedPhotos}
					priceOption={priceOption}
					offerPrice={offerPrice}
					offerIncludesTax={offerIncludesTax}
					isPublish={isPublish}
					closeModal={closeModal}
				/>
			);
	};

	return (
		<React.Fragment>
			<Snackbar
				open={isSnackBarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackBar}
			>
				<Alert
					onClose={handleCloseSnackBar}
					severity="error"
					sx={{ width: "100%", marginBottom: "5rem" }}
				>
					{snackMessage}
				</Alert>
			</Snackbar>
			<div className="pb-28">
				<button
					onClick={handleBack}
					className="flex items-center gap-1 bg-transparent pl-4 pt-4"
				>
					<ChevronLeftIcon />
					<p className="text-[color:var(--deals-primary-med)] text-base">
						Back
					</p>
				</button>
				{displayHousingPostForms(step)}
			</div>
			<div className="fixed bottom-0 w-full bg-white ">
				<div className="flex gap-1">
					<span
						className={`flex-grow h-1 ${
							step === 1 ? "bg-[color:var(--secondary)]" : "bg-gray-100 "
						}`}
					></span>
					<span
						className={`flex-grow h-1  ${
							step === 2 ? "bg-[color:var(--secondary)]" : "bg-gray-100 "
						}`}
					></span>
					<span
						className={`flex-grow h-1  ${
							step === 3
								? "bg-[color:var(--gradient-secondary)]"
								: "bg-gray-100 "
						}`}
					></span>
					<span
						className={`flex-grow h-1  ${
							step === 4
								? "bg-[color:var(--gradient-secondary)]"
								: "bg-gray-100 "
						}`}
					></span>
					<span
						className={`flex-grow h-1  ${
							step === 5
								? "bg-[color:var(--gradient-secondary)]"
								: "bg-gray-100 "
						}`}
					></span>
				</div>
				<div className="flex gap-4 p-4">
					<button className="rounded w-1/2 text-[color:var(--deals-primary-med)] border border-[color:var(--deals-primary-med)]">
						Save & Exit
					</button>
					<button
						onClick={handleNext}
						className="rounded w-1/2 text-white bg-[color:var(--secondary)] py-2"
					>
						{step === 5 ? "Publish" : "Next"}
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}

export default MarketplacePostBusinessUser;

MarketplacePostBusinessUser.getLayout = function getLayout(page) {
	return <MainLayout route="business-center">{page}</MainLayout>;
};
