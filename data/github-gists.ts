import { DataAtInterval } from "../utils/api/data-at-interval";
import { getBrowser } from "../utils/api/playwright-browser";
import { config } from "../utils/config";
import { GlobalRef } from "../utils/global-ref";

interface GitHubSnippet {
	url: string;
	name: string;
	description: string;
}

export const githubGistsData = new GlobalRef(
	"data.githubGists",
	new DataAtInterval(async () => {
		const browser = await getBrowser();
		const page = await browser.newPage();

		// without /models, shows most popular
		await page.goto(config.socialLinks.githubGist, {
			waitUntil: "networkidle",
		});

		const snippetEls = await page.$$(
			"div.gist-snippet > div:first-of-type",
		);

		const snippets: GitHubSnippet[] = [];

		for (const snippetEl of snippetEls) {
			const snippetText = await snippetEl.textContent();
			if (snippetText == null) continue;

			const lines = snippetText
				.split(config.socialIds.github)[1]
				.split("\n\n\n")[0]
				.trim()
				.split(/\n\s+\n\s+\n/)
				.map(l => l.trim());

			const name = config.socialIds.github + " " + lines[0];
			const description = lines[2];

			const aEl = await snippetEl.$("a:nth-child(1)");
			const url =
				"https://gist.github.com" + (await aEl?.getAttribute("href"));

			snippets.push({ url, name, description });
		}

		page.close();

		return snippets.slice(0, 8);
	}),
);

export type GitHubGistsData = ReturnType<
	typeof githubGistsData.value.getLatest
>;
