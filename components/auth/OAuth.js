import React from "react";
import styles from "@/styles/components/auth/o-auth.module.css";
import facebook_logo from "@/public/static/images/logos/facebook_login_icon.svg";
import apple_logo from "@/public/static/images/logos/apple_login_icon.svg";
import google_logo from "@/public/static/images/logos/google_login_icon.svg";
import line_logo from "@/public/static/images/logos/line_login_icon.svg";
import Image from "next/image";

function OAuth() {
	return (
		<React.Fragment>
			<button className={`${styles.oauth_group} ${styles.flexCol}`}>
				<Image
					src={facebook_logo}
					alt="facebook logo"
					className={`${styles.oauth_logo}`}
				/>
				<p>Facebook</p>
			</button>
			<button className={`${styles.oauth_group} ${styles.flexCol}`}>
				<Image
					src={google_logo}
					alt="google logo"
					className={`${styles.oauth_logo}`}
				/>
				<p>Google</p>
			</button>
			<button className={`${styles.oauth_group} ${styles.flexCol}`}>
				<Image
					src={apple_logo}
					alt="apple logo"
					className={`${styles.oauth_logo}`}
				/>
				<p>Apple</p>
			</button>
			<button className={`${styles.oauth_group} ${styles.flexCol}`}>
				<Image
					src={line_logo}
					alt="line logo"
					className={`${styles.oauth_logo}`}
				/>
				<p>Line</p>
			</button>
		</React.Fragment>
	);
}

export default OAuth;
