import "@/styles/globals.css";
import { Kanit } from "next/font/google";
import AuthProvider from "@/components/auth/AuthProvider";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --kanit-font: ${kanit.style.fontFamily};
          }
        `}
      </style>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </>
  );
}
