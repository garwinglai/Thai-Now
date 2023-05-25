import React from "react";
import styles from "@/styles/components/layouts/get-in-touch-layout-mobile.module.css";
import { TextField } from "@mui/material";

function GetInTouchLayoutMobile() {
	return (
		<div className={`${styles.get_in_touch_box}`}>
			<h3>Get in touch?</h3>
			<br />
			<p>
				For further questions, including partnership opportunities, please email
				info@thainowapp.com or contact using our contact form.
			</p>
			<br />
			<br />
			<form className={`${styles.form_box} ${styles.flexCol}`}>
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					fullWidth
				/>
				<TextField
					id="outlined-basic"
					label="Email"
					variant="outlined"
					fullWidth
					type="email"
				/>
				<div className={`${styles.textarea_box}`}>
					<TextField
						id="outlined-multiline-static"
						label="How can we help you?"
						multiline
						rows={4}
						fullWidth
					/>
					<p>0/500</p>
				</div>

				<p className={`${styles.footer_paragraph}`}>
					Please enter the details of your request and, if you have any
					questions regarding our Terms of Use, please include specific samples
					of the usage you wish to give our resources. Once your request is
					submitted, a member of our support staff will respond as soon as
					possible.
				</p>

				<button className={`${styles.submit_btn}`}>Send</button>
			</form>
		</div>
	);
}

export default GetInTouchLayoutMobile;
