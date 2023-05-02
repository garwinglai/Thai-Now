import "@/styles/globals.css";
import { Kanit } from "next/font/google";
import MainLayout from "@/components/layouts/MainLayout";

const kanit = Kanit({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }) {
	return (
		<>
			<style jsx global>
				{`
					:root {
						--kanit-font: ${kanit.style.fontFamily};
					}
				`}
			</style>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</>
	);
}
