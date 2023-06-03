import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import Image from "next/image";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function HousingFormOne({
	handlePhotoFileChange,
	handleHousingTypeChange,
	housingType,
	uploadedPhotos,
	handleHousingValuesChange,
	housingPostValues,
}) {
	const { title, description, location } = housingPostValues;

	return (
		<form className="p-4">
			<h4 className="pt-4">Tell us about your place.</h4>
			<label
				htmlFor="post-title"
				className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
			>
				Title <span className="text-[color:var(--secondary)] ">* </span>
			</label>
			<input
				type="text"
				name="title"
				id="title"
				value={title}
				onChange={handleHousingValuesChange}
				className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
			/>

			<div className="mt-4">
				<label
					htmlFor="demo-controlled-radio-buttons-group"
					className=" text-[color:var(--deals-primary)] pt-6 pb-2 "
				>
					What kind of place will you host?{" "}
					<span className="text-[color:var(--secondary)] ">* </span>
				</label>

				<RadioGroup
					aria-labelledby="demo-controlled-radio-buttons-group"
					name="controlled-radio-buttons-group"
					value={housingType}
					onChange={handleHousingTypeChange}
				>
					<FormControlLabel
						value="Apartment"
						control={<Radio className="flex justify-between" />}
						label="Apartment"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Room"
						control={<Radio />}
						label="Room"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Condo"
						control={<Radio />}
						label="Condo"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="House"
						control={<Radio />}
						label="House"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
					<FormControlLabel
						value="Other"
						control={<Radio />}
						label="Other"
						labelPlacement="start"
						sx={{
							display: "flex",
							justifyContent: "space-between",
							color: "#717171",
						}}
					/>
				</RadioGroup>
			</div>
			<h5 className=" text-[color:var(--deals-primary)] pt-4 pb-2 ">
				Upload your photo{" "}
				<span className="text-[color:var(--secondary)] ">* </span>
			</h5>
			<label htmlFor="photos" className="hover:cursor-pointer">
				<input
					type="file"
					name="photos"
					id="photos"
					className="hidden"
					onChange={handlePhotoFileChange}
				/>
				<span className="flex flex-col items-center gap-4 bg-[color:var(--input-bg-secondary)] rounded py-4">
					<p className="text-[color:var(--label-color)]">
						Click to upload photos
					</p>
					<div className="bg-white rounded-full p-4">
						<PhotoSizeSelectActualIcon sx={{ color: "var(--label-color)" }} />
					</div>
					<p className="text-[color:var(--label-color)]">Image</p>
				</span>
			</label>
			{uploadedPhotos.length !== 0 && (
				<div className="flex w-full gap-4 pt-4">
					{uploadedPhotos.map((file, idx) => (
						<div className=" w-14 h-14 relative">
							<Image
								src={file.imgUrl}
								alt={file.fileName}
								fill={true}
								className=" object-cover w-full rounded"
							/>
						</div>
					))}
				</div>
			)}
			<p className="text-[color:var(--label-color)]  text-sm pt-2 ">
				<span className="text-[color:var(--secondary)] ">* </span>
				Recommended photos: 11
			</p>
			<h5 className=" text-[color:var(--deals-primary)] pt-6 pb-2 ">
				Description <span className="text-[color:var(--secondary)] ">* </span>
			</h5>
			<textarea
				value={description}
				onChange={handleHousingValuesChange}
				name="description"
				id="description"
				rows="5"
				className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
			/>
			<p className=" text-gray-400 text-sm font-light ">150/500</p>
			<h5 className=" text-[color:var(--deals-primary)] pt-6 pb-2 ">
				Location <span className="text-[color:var(--secondary)] ">* </span>
			</h5>
			<div className="w-full relative">
				<i className="absolute top-1 left-2">
					<FmdGoodOutlinedIcon />
				</i>
				<input
					value={location}
					onChange={handleHousingValuesChange}
					name="location"
					type="text"
					className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-9 py-2 "
				/>
			</div>
		</form>
	);
}

export default HousingFormOne;
