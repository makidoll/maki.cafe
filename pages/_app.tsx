import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import "../fonts/kg-always-a-good-time/kg-always-a-good-time.css";
import "../fonts/minecraft/minecraft.css";

const theme = extendTheme({
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
	},
	fonts: {
		// heading: `'Torus', sans-serif`,
		// heading: `'KG Always A Good Time', serif`,
		body: `'Inter', sans-serif`,
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Head>
				{/* <meta charset="utf-8" /> */}
				<title>Maki 🦊🍃</title>
				<base href="/" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/assets/icons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/assets/icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/assets/icons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/assets/icons/site.webmanifest" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<meta name="msapplication-TileColor" content="#e91e63" />
				<meta
					name="msapplication-config"
					content="/assets/icons/browserconfig.xml"
				/>
				<meta name="theme-color" content="#ffffff" />
				<meta
					name="description"
					content="hi im Maki and im a flower fox fairy who makes things ❤️"
				/>
				<meta property="og:url" content="https://maki.cafe/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Maki 🦊🍃" />
				<meta
					property="og:description"
					content="hi im Maki and im a flower fox fairy who makes things ❤️"
				/>
				<meta
					property="og:image"
					content="https://maki.cafe/assets/icon.png"
				/>
				<meta property="twitter:domain" content="maki.cafe" />
				<meta property="twitter:url" content="https://maki.cafe/" />
				<meta name="twitter:title" content="Maki 🦊🍃" />
				<meta
					name="twitter:description"
					content="hi im Maki and im a flower fox fairy who makes things ❤️"
				/>
				<meta
					name="twitter:image"
					content="https://maki.cafe/assets/icon.png"
				/>
			</Head>
			<Script
				id="ithelpsme"
				defer
				data-domain="maki.cafe"
				data-api="https://ithelpsme.cutelab.space/api/event"
				dangerouslySetInnerHTML={{
					__html: `
							// prettier-ignore
							!function(){"use strict";var a=window.location,r=window.document,t=window.localStorage,o=r.currentScript,s=o.getAttribute("data-api")||new URL(o.src).origin+"/api/event",l=t&&t.plausible_ignore;function p(t){console.warn("Ignoring Event: "+t)}function e(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname)||"file:"===a.protocol)return p("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){if("true"==l)return p("localStorage flag");var i={};i.n=t,i.u=a.href,i.d=o.getAttribute("data-domain"),i.r=r.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=JSON.stringify(e.props));var n=new XMLHttpRequest;n.open("POST",s,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(i)),n.onreadystatechange=function(){4==n.readyState&&e&&e.callback&&e.callback()}}}var i=window.plausible&&window.plausible.q||[];window.plausible=e;for(var n,w=0;w<i.length;w++)e.apply(this,i[w]);function d(){n!==a.pathname&&(n=a.pathname,e("pageview"))}var u,c=window.history;c.pushState&&(u=c.pushState,c.pushState=function(){u.apply(this,arguments),d()},window.addEventListener("popstate",d)),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){n||"visible"!==r.visibilityState||d()}):d()}();
						`,
				}}
			></Script>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
