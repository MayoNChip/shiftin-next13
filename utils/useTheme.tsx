"use client";
import React, { useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState("light");

	const toggleTheme = (currentTheme: "light" | "dark") => {
		currentTheme === "light" ? setTheme("dark") : setTheme("light");
	};

	return {
		theme,
		setTheme,
		toggleTheme,
	};
}
