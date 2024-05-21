"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { cascadiaMono, snPro } from "../fonts/fonts";

if (globalThis.localStorage != null) {
	globalThis.localStorage.setItem("chakra-ui-color-mode", "dark");
}

const theme = extendTheme({
	initialColorMode: "dark",
	useSystemColorMode: false,
	components: {
		// Heading: {
		// 	baseStyle: {
		// 		// letterSpacing: "-0.05em",
		// 		fontWeight: "400",
		// 	},
		// },
		Link: {
			baseStyle: {
				color: "brand.500",
				_hover: {
					textDecoration: "none",
				},
			},
		},
	},
	colors: {
		// material design pink
		brand: {
			50: "#fce4ec",
			100: "#f8bbd0",
			200: "#f48fb1",
			300: "#f06292",
			400: "#ec407a",
			500: "#e91e63",
			600: "#d81b60",
			700: "#c2185b",
			800: "#ad1457",
			900: "#880e4f",
			// a100: "#ff80ab",
			// a200: "#ff4081",
			// a400: "#f50057",
			// a700: "#c51162",
		},
		tomorrow: "#1d1f21",
		hexcorp: "#ff64ff",
		hexcorpDark: "#231929",
		justKindaDark: "#111111",
	},
	styles: {
		global: {
			body: {
				bg: "justKindaDark",
				color: "white",
			},
		},
	},
	fonts: {
		heading: snPro.style.fontFamily,
		body: snPro.style.fontFamily,
		monospace: cascadiaMono.style.fontFamily,
	},
});

export function Providers({ children }: { children: React.ReactNode }) {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
