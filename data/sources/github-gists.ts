import { DataSource } from "../data-source";
import { getBrowser } from "../../utils/api/playwright-browser";
import { config } from "../../utils/config";

interface GitHubSnippet {
	url: string;
	name: string;
	description: string;
}

export type GitHubDataResponse = GitHubSnippet[];

export class GitHubData extends DataSource<GitHubDataResponse> {
	async fetchData() {
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
	}
}
