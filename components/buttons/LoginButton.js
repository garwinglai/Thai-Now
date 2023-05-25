import React from "react";
import styles from "../../styles/components/buttons/login-button.module.css";
import gStyles from "../../styles/global.module.css";
import account_icon from "../../public/static/images/icons/icon_account_circle.svg";
import Image from "next/image";
import Link from "next/link";

function LoginButton() {
	return (
		<Link
			href={"/auth/signin"}
			className={`${styles.button_login} ${styles.flex}`}
		>
			<>
				<Image alt="account icon" src={account_icon} />
				<p className={`${gStyles.p_small}`}>Login</p>
				<p className={`${gStyles.p_small}`}>|</p>
				<p className={`${gStyles.p_small}`}>Sign up</p>
			</>
		</Link>
	);
}

export default LoginButton;
