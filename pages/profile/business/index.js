import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainLayout from "@/components/layouts/MainLayout";
import avatar_image from "@/public/static/images/temp_avatar.png";
import Image from "next/image";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useRouter } from "next/router";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import CustomModal from "@/components/layouts/CustomModal";
import complete_post from "@/public/static/images/complete_post.png";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Link from "next/link";

function BusinessProfile() {
	const [uploadedBusinessPhotos, setUploadedBusinessPhotos] = useState([]);
	const [isPublish, setIsPublish] = useState(false);

	const { back } = useRouter();

	const handleBack = () => {
		back();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsPublish(true);
	};

	const closeModal = () => {
		setIsPublish(false);
	};

	const handlePhotoFileChange = (e) => {
		const selectedImage = e.target.files[0];
		const fileName = selectedImage.name;
		const imgUrl = URL.createObjectURL(selectedImage);
		const imgData = { imgUrl, fileName };

		if (!uploadedBusinessPhotos.includes(imgData))
			setUploadedBusinessPhotos((prev) => [...prev, imgData]);
	};

	return (
		<React.Fragment>
			<button
				onClick={handleBack}
				className="flex items-center gap-1 bg-transparent pl-4 pt-4"
			>
				<ChevronLeftIcon />
				<p className="text-[color:var(--deals-primary-med)] text-base">Back</p>
			</button>
			<form onSubmit={handleSubmit} className="pb-32">
				<h4 className="pb-4 pt-2 pl-4">Basic information</h4>
				<div className="relative text-center mb-4">
					<Image
						className="mx-auto w-40"
						src={avatar_image}
						alt="profile image"
					/>
					<button className="flex absolute left-1/2 bottom-[-15px] -translate-x-[50%] gap-1 items-center bg-white px-3 py-1 rounded-full shadow-lg">
						<CameraAltOutlinedIcon fontSize="small" />
						<p className="font-extralight">Edit</p>
					</button>
				</div>
				<div className="px-4">
					<label
						htmlFor="post-title"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						Business name{" "}
						<span className="text-[color:var(--secondary)] ">* </span>
					</label>
					<input
						type="text"
						name="bizName"
						id="bizName"
						// value={title}
						// onChange={handleHousingValuesChange}
						className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
					/>
				</div>
				<div className="px-4">
					<label
						htmlFor="email"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						// value={email}
						// onChange={handleChangeBizValues}
						className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
					/>
				</div>
				<div className="px-4">
					<label
						htmlFor="phone-number"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						Phone number{" "}
						<span className="text-[color:var(--secondary)] ">* </span>
					</label>
					<input
						type="number"
						name="phoneNumber"
						id="phoneNumber"
						// value={phoneNumber}
						// onChange={handleChangeBizValues}
						className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
					/>
				</div>
				<div className="px-4">
					<label
						htmlFor="address"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						Business address
						<span className="text-[color:var(--secondary)] "> * </span>
					</label>
					<input
						type="text"
						name="address"
						id="address"
						// value={address}
						// onChange={handleChangeBizValues}
						className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
					/>
				</div>
				<div className="px-4">
					<label
						htmlFor="website"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						Website
						<span className="font-extralight">{` (Optional)`}</span>
					</label>
					<input
						type="text"
						name="website"
						id="website"
						// value={website}
						// onChange={handleChangeBizValues}
						className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full indent-4 py-2 "
					/>
				</div>
				<div className="px-4">
					<label
						htmlFor="about"
						className="block text-[color:var(--deals-primary)] pt-4 pb-2 "
					>
						About your business
						<span className="font-extralight">{` (Optional)`}</span>
					</label>
					<textarea
						// value={about}
						// onChange={handleChangeBizValues}
						name="about"
						id="about"
						rows="5"
						className="w-full bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] rounded p-4 "
					/>
					<p className="font-extralight">151/500</p>
				</div>
				<div className="px-4">
					<h5 className=" text-[color:var(--deals-primary)] pt-8 pb-2 ">
						Upload your business photo{" "}
						<span className="text-[color:var(--secondary)] ">* </span>
					</h5>
					<label htmlFor="photos" className="hover:cursor-pointer ">
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
								<PhotoSizeSelectActualIcon
									sx={{ color: "var(--label-color)" }}
								/>
							</div>
							<p className="text-[color:var(--label-color)]">Image</p>
						</span>
					</label>
					{uploadedBusinessPhotos.length !== 0 && (
						<div className="flex w-full gap-4 pt-4">
							{uploadedBusinessPhotos.map((file, idx) => (
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
				</div>
				<div className="px-4">
					<h5 className=" text-[color:var(--deals-primary)] pt-8 pb-4">
						Business hours
					</h5>
					<div>
						<select
							name="interval"
							// onChange={handleChangePrice}
							id="interval"
							// value={exactPrice.interval}
							className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
						>
							<option value="Mon">Mon</option>
							<option value="Tues">Tues</option>
							<option value="Wed">Wed</option>
							<option value="Thurs">Thurs</option>
							<option value="Fri">Fri</option>
							<option value="Sat">Sat</option>
							<option value="Sun">Sun</option>
						</select>
					</div>
					<div className="flex w-full gap-4 mt-4">
						<div className="flex-grow">
							<select
								name="interval"
								// onChange={handleChangePrice}
								id="interval"
								// value={exactPrice.interval}
								className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
							>
								<option value="Mon">TBA</option>
								{/* <option value="Tues">Tues</option>
								<option value="Wed">Wed</option>
								<option value="Thurs">Thurs</option>
								<option value="Fri">Fri</option>
								<option value="Sat">Sat</option>
								<option value="Sun">Sun</option> */}
							</select>
						</div>
						<div className="flex-grow">
							<select
								name="interval"
								// onChange={handleChangePrice}
								id="interval"
								// value={exactPrice.interval}
								className="rounded bg-[color:var(--input-bg-secondary)] text-[color:var(--deals-primary)] w-full p-2 h-full "
							>
								<option value="Mon">TBA</option>
								{/* <option value="Tues">Tues</option>
								<option value="Wed">Wed</option>
								<option value="Thurs">Thurs</option>
								<option value="Fri">Fri</option>
								<option value="Sat">Sat</option>
								<option value="Sun">Sun</option> */}
							</select>
						</div>
					</div>
					<button
						type="button"
						className="border border-[color:var(--deals-primary-med)] text-[color:var(--deals-primary)] rounded px-4 py-1 mt-4"
					>
						Add Hour
					</button>
				</div>
				<div className="px-4">
					<h5 className=" text-[color:var(--deals-primary)] pt-8 pb-4 ">
						Upload business qualification
						<span className="text-[color:var(--secondary)] "> * </span>
					</h5>
					<label htmlFor="photos" className="hover:cursor-pointer ">
						<input
							type="file"
							name="photos"
							id="photos"
							className="hidden"
							// onChange={handlePhotoFileChange}
						/>
						<span className="flex flex-col items-center gap-4 bg-[color:var(--input-bg-secondary)] rounded py-4">
							<p className="text-[color:var(--label-color)]">
								Click to upload photos
							</p>
							<div className="bg-white rounded-full p-4">
								<PhotoSizeSelectActualIcon
									sx={{ color: "var(--label-color)" }}
								/>
							</div>
							<p className="text-[color:var(--label-color)]">Image</p>
						</span>
					</label>
					{/* {uploadedPhotos.length !== 0 && (
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
				)} */}
					<p className="text-[color:var(--label-color)]  text-sm pt-4 ">
						<span className="text-[color:var(--secondary)] ">* </span>
						Notes
					</p>
					<ul>
						<li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
							Check the accepted doc types.
						</li>
						<li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
							Each file must be less than 5000 KB.
						</li>
						<li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
							Images must be clear, in full-color, and contain the business
							legal name and required information.
						</li>
						<li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
							Documents must be valid and can&apos;t be expired or modified.
						</li>
						<li className="list-disc font-extralight ml-8 text-sm text-[color:var(--label-color)] ">
							Files must be JPEG, JPG, or PNG.
						</li>
					</ul>
				</div>
				<div className="fixed bottom-0 w-full bg-white p-4 border-t border-gray-100 ">
					<button
						type="submit"
						className="rounded w-full text-white bg-[color:var(--secondary)] py-2"
					>
						Save
					</button>
				</div>
			</form>
			<CustomModal isPublish={isPublish} onClose={closeModal}>
				<div className="flex flex-col items-center text-center gap-4">
					<Image src={complete_post} alt="complete post image" />
					<h4>Complete</h4>
					<p className="font-light">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. A officiis
						laborum labore quaerat beatae similique.
					</p>
					<PrimaryButton name="Create your Post" />
					<Link
						href="/business-center/business-user"
						className="underline font-light text-[color:var(--deals-primary)] "
					>
						Go to Business Center
					</Link>
				</div>
			</CustomModal>
		</React.Fragment>
	);
}

export default BusinessProfile;

BusinessProfile.getLayout = function getLayout(page) {
	return <MainLayout route="business-profile">{page}</MainLayout>;
};
