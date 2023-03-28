import React from "react";
import styles from "../../styles/components/buttons/login-button.module.css";
import gStyles from "../../styles/global.module.css";
import account_icon from "../../public/images/header/account-icon-white.png";
import Image from "next/image";

function LoginButton() {
	function handleLogin() {
		window.alert("login clicked.")
	}

	return (
		<button
			onClick={handleLogin}
			className={`${styles.button_login} ${styles.flex}`}
		>
			<>
				<Image alt="account icon" src={account_icon} />
				<p className={`${gStyles.p_small}`}>Login</p>
				<p className={`${gStyles.p_small}`}>|</p>
				<p className={`${gStyles.p_small}`}>Sign up</p>
			</>
		</button>
	);
}

export default LoginButton;
