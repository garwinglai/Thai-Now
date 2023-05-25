import React from "react";
import Image from "next/image";
import logo from "../public/static/images/logos/logo_white.svg";

function test() {
	return (
		<div>
			<Image src={logo} alt="logo" />
		</div>
	);
}

export default test;
