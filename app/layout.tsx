import React from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { NextAuthProvider } from "./providers";

export const metadata = {
	title: "Shiftin",
	description: "",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const { setTheme, theme } = useTheme();
	return (
		<html lang="en">
			<body>
				<Navbar />
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
