import { Component, Input, OnInit } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";
import { config } from "../../config";

interface MediaTweet {
	title: string;
	link: string;
	imageUrl: string;
}

@Component({
	selector: "app-twitter-media",
	templateUrl: "./twitter-media.component.html",
	styleUrls: ["./twitter-media.component.scss"],
})
export class TwitterMediaComponent implements OnInit {
	config = config;

	nitterUrl = config.api.nitter;

	mediaTweets: MediaTweet[] = [];

	@Input() username: string;

	constructor() {}

	ngOnInit(): void {
		if (isScullyRunning()) return;

		this.getTweets();
	}

	async getTweets() {
		const res = await fetch(
			this.nitterUrl +
				"/" +
				this.username.replace(/@/, "").toLowerCase() +
				"/media/rss",
		);
		const xmlStr = await res.text();
		const xml = new DOMParser().parseFromString(xmlStr, "application/xml");

		this.mediaTweets = Array.from(
			xml.querySelectorAll("rss > channel > item"),
		)
			.map(item => {
				const username = item.querySelector("creator").textContent;
				if (username != "@" + this.username) return null;

				let title: string = item.querySelector("title").textContent;

				// ignore retweets and (replies, actually no because i could reply with more images to myself)
				if (/^RT by @[^]+?: /.test(title)) return null;
				// if (/^R to (@[^]+?): /.test(title)) return null;

				const imageUrlMatches = item
					.querySelector("description")
					.textContent.match(/src="(http[^]+?)"/);

				if (imageUrlMatches == null) return null;

				const imageUrl = imageUrlMatches[1];

				let tweet = {
					title,
					link: item
						.querySelector("link")
						.textContent.replace(
							this.nitterUrl,
							"https://twitter.com",
						),
					imageUrl,
				};

				return tweet;
			})
			.filter(item => item != null)
			.slice(0, 9);
	}
}
