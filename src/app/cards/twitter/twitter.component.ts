import { Component, OnInit } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";
import { config } from "../../config";

interface Tweet {
	username: string;
	userImageUrl: string;
	title: string;
	link: string;
	imageUrl: string;
	retweet: boolean;
	reply: string;
}

@Component({
	selector: "app-twitter",
	templateUrl: "./twitter.component.html",
	styleUrls: ["./twitter.component.scss"],
})
export class TwitterComponent implements OnInit {
	config = config;

	nitterUrl = "https://nitter.cutelab.space";

	username = "@MakiXx_";
	tweets: Tweet[] = [];

	constructor() {}

	ngOnInit() {
		if (isScullyRunning()) return;

		this.getTweets();
	}

	userImageUrlCache = {};
	async getUserImage(username: string) {
		username = username.replace(/@/g, "").toLowerCase();

		if (this.userImageUrlCache[username] != null) {
			return this.userImageUrlCache[username];
		}

		const res = await fetch(this.nitterUrl + "/" + username + "/rss");
		const xmlStr = await res.text();
		const xml = new DOMParser().parseFromString(xmlStr, "application/xml");

		const userImageUrl = xml.querySelector(
			"rss > channel > image > url",
		).textContent;

		this.userImageUrlCache[username] = userImageUrl;
		return userImageUrl;
	}

	async getTweets() {
		const res = await fetch(
			this.nitterUrl +
				"/" +
				this.username.replace(/@/, "").toLowerCase() +
				// "/with_replies/rss",
				"/rss",
		);
		const xmlStr = await res.text();
		const xml = new DOMParser().parseFromString(xmlStr, "application/xml");

		this.tweets = Array.from(xml.querySelectorAll("rss > channel > item"))
			.slice(0, 4)
			.map(item => {
				const username = item.querySelector("creator").textContent;
				let title: string = item.querySelector("title").textContent;

				let retweet = false;
				if (/^RT by @[^]+?: /.test(title)) {
					retweet = true;
					title = title.replace(/^RT by @[^]+?: /, "");
				}

				let reply = "";
				const replyMatches = title.match(/^R to (@[^]+?): /);
				if (replyMatches != null) {
					reply = replyMatches[1];
					title = title.replace(/^R to @[^]+?: /, "");
				}

				let imageUrl = "";
				const imageUrlMatches = item
					.querySelector("description")
					.textContent.match(/src="(http[^]+?)"/);
				if (imageUrlMatches != null) {
					imageUrl = imageUrlMatches[1];
				}

				let tweet: Tweet = {
					username,
					// userImageUrl: "https://unavatar.io/twitter/" + lowerUsername,
					userImageUrl: "",
					title,
					link: item
						.querySelector("link")
						.textContent.replace(
							this.nitterUrl,
							"https://twitter.com",
						),
					retweet,
					reply,
					imageUrl,
				};

				// dont await this
				this.getUserImage(username).then(userImageUrl => {
					tweet.userImageUrl = userImageUrl;
				});

				return tweet;
			});
	}
}
