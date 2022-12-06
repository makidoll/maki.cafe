import { GlobalRef } from "../utils/global-ref";
import { Browser, firefox } from "playwright";

const browser = new GlobalRef<Browser>("playwright.browser");

export async function getBrowser() {
	if (browser.value == null) {
		console.log("Launching Firefox for API fetching");
		browser.value = await firefox.launch({ headless: true });
	}
	return browser.value;
}
