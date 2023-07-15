import React from "react";
import account_icon from "../../public/static/images/icons/icon_account_circle.svg";
import Image from "next/image";
import Link from "next/link";

function LoginButton() {
  return (
    <Link
      href={"/auth/signin"}
      className="flex items-center gap-2 bg-[color:var(--login-button-color)] rounded px-4"
    >
      <>
        <Image alt="account icon" src={account_icon} />
        <p className="text-white font-light">Login</p>
        <p className="text-white font-light">|</p>
        <p className="text-white font-light">Sign up</p>
      </>
    </Link>
  );
}

export default LoginButton;
