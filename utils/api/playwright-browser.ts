import { Browser, chromium } from "playwright";
import { ReplaySubject, firstValueFrom } from "rxjs";
import { GlobalRef } from "../global-ref";

const browser = new GlobalRef<ReplaySubject<Browser>>("playwright.browser");

export async function getBrowser() {
	if (browser.value == null) {
		// immediately set so we're not launching multiple times
		browser.value = new ReplaySubject();

		console.log("Launching Chromium once for API fetching");
		try {
			browser.value.next(
				// was firefox but couldnt get it to work on alpine in docker
				await chromium.launch({
					headless: true,
					executablePath: process.env.CHROMIUM_PATH ?? "",
				}),
			);
		} catch (error) {
			browser.value.error(error);
			console.error(error);
		}
	}
	return await firstValueFrom(browser.value);
}
