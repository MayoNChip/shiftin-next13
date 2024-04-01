import React from "react";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

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
			<body className="h-screen bg-background">
				<ThemeProvider
					attribute="class"
					enableSystem
					defaultTheme="system"
					disableTransitionOnChange
				>
					<Navbar />
					<NextAuthProvider>{children}</NextAuthProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
