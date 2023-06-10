import React from "react";
import styles from "../../styles/components/layouts/footer.module.css";
import Image from "next/image";
import logo from "../../public/static/images/logos/logo_white.svg";
import Link from "next/link";
import gStyles from "../../styles/global.module.css";
import twitter_logo from "../../public/static/images/logos/twitter_logo.svg";
import facebook_logo from "../../public/static/images/logos/facebook_logo.svg";
import youtube_logo from "../../public/static/images/logos/youtube_logo.svg";
import instagram_logo from "../../public/static/images/logos/instagram_logo.svg";
import playButton from "../../public/static/images/buttons/playstore_download_button.svg";
import appleDownloadButton from "../../public/static/images/buttons/apple_download_button.svg";
import { Divider } from "@mui/material";

function Footer() {
	function desktopFooter() {
		return (
			<div className={`${styles.desktop_footer} ${styles.footer}`}>
				<div className={`${styles.grid}`}>
					<div className={`${styles.grid_item_1} ${styles.logo}`}>
						<Image
							src={logo}
							alt="thai now logo"
							className={`${styles.thainow_logo}`}
							priority={true}
						/>
						<p className={`${gStyles.p_small}`}>A : Thai Town, Hollywood</p>
						<p className={`${gStyles.p_small}`}>M : 123456789</p>
						<p className={`${gStyles.p_small}`}>E : info@thainowapp.com</p>
					</div>
					<div className={`${styles.grid_item_6} ${styles.socials_group}`}>
						<Image
							className={`${styles.social_icon}`}
							src={twitter_logo}
							alt="twitter logo"
						/>
						<Image
							className={`${styles.social_icon}`}
							src={facebook_logo}
							alt="facebook logo"
						/>
						<Image
							className={`${styles.social_icon}`}
							src={youtube_logo}
							alt="youtube logo"
						/>
						<Image
							className={`${styles.social_icon}`}
							src={instagram_logo}
							alt="instagram logo"
						/>
					</div>
					<div className={`${styles.grid_item_2} ${styles.contact_group}`}>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Deals
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Jobs
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Housing
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Marketplace
						</Link>
					</div>
					<div className={`${styles.grid_item_3}`}>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Thai Help
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Guide Book
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							How News
						</Link>
					</div>
					<div className={`${styles.grid_item_4}`}>
						<h4>About</h4>

						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							About us
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Thai Consulate News
						</Link>
					</div>
					<div className={`${styles.grid_item_5}`}>
						<h4>Help</h4>

						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Help center
						</Link>
						<Link href={"/"} className={`${gStyles.p_small} ${styles.link}`}>
							Sign up
						</Link>
					</div>

					<div className={`${styles.grid_item_7} ${styles.download_group}`}>
						<p className={`${gStyles.p_medium_light}`}>
							Download Thainow App Free
						</p>
						<div className={`${styles.flex} ${styles.download_button_group}`}>
							<Image
								className={`${styles.download_button}`}
								src={appleDownloadButton}
								alt="apple download button"
							/>
							<Image
								className={`${styles.download_button}`}
								src={playButton}
								alt="google download button"
							/>
						</div>
					</div>
				</div>
				<div className={`${styles.flex} ${styles.copyright}`}>
					<p>© ThaiNow 2021, All rights reserved.</p>
					<div className={`${styles.flex} ${styles.privacy_links}`}>
						<Link className={`${styles.link} ${gStyles.p_small}`} href="/">
							Privacy
						</Link>
						<p>•</p>
						<Link className={`${styles.link} ${gStyles.p_small}`} href="/">
							Terms
						</Link>
					</div>
				</div>
			</div>
		);
	}

	function mobileFooter() {
		return (
			<div className=" bg-[color:var(--footer-bg)] px-8 flex flex-col items-center py-4 gap-2 text-sm font-light lg:hidden">
				<p className="text-white text-sm font-extralight">
					A: Thai Town, Hollywood
				</p>
				<p className="text-white text-sm font-extralight">M: 123456789</p>
				<p className="text-white text-sm font-extralight">
					E: info@thainowapp.com
				</p>
				<span className="flex gap-2 my-4">
					<Image className="w-8 h8" src={twitter_logo} alt="twitter logo" />
					<Image className="w-8 h8" src={facebook_logo} alt="facebook logo" />
					<Image className="w-8 h8" src={youtube_logo} alt="youtube logo" />
					<Image className="w-8 h8" src={instagram_logo} alt="instagram logo" />
				</span>
				<div className="flex items-center justify-center gap-2 flex-wrap">
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Deals
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Jobs
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Housing
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Marketplace
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Thai Help
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						Guide Book
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						How News
					</Link>
					<span className="border-r border-white py-1"></span>
					<Link
						href={"/"}
						className="text-sm font-extralight  text-white w-fit px-2"
					>
						About
					</Link>
				</div>
				<span className="border-t border-white w-full mx-8 my-4"></span>
				<p className="text-white font-extralight text-sm">
					© ThaiNow, 2021. All rights reserved.
				</p>
				<div className="flex gap-2 items-center">
					<Link className="text-sm font-extralight text-white px-2" href="/">
						Privacy
					</Link>
					<p className="text-white font-extralight text-sm">•</p>
					<Link className="text-sm font-extralight text-white px-2" href="/">
						Terms
					</Link>
				</div>
			</div>
		);
	}

	return (
		<React.Fragment>
			{desktopFooter()}
			{mobileFooter()}
		</React.Fragment>
	);
}

export default Footer;
