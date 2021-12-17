import { Component, Input, OnInit } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";
import * as cheerio from "cheerio";
import { config } from "../../config";

interface Post {
	alt: string;
	link: string;
	imageUrl: string;
}

@Component({
	selector: "app-instagram",
	templateUrl: "./instagram.component.html",
	styleUrls: ["./instagram.component.scss"],
})
export class InstagramComponent implements OnInit {
	readonly bibliogramUrl = config.api.bibliogram;
	readonly maxPosts = 9;

	config = config;

	@Input() username: string;

	posts: Post[] = [];
	totalPosts = -1;
	followers = -1;
	following = -1;

	constructor() {}

	ngOnInit(): void {
		if (isScullyRunning()) return;

		this.getData(this.username);
	}

	async getData(username: string) {
		const res = await fetch(this.bibliogramUrl + "/u/" + username);
		const htmlStr = await res.text();
		const $ = cheerio.load(htmlStr);

		// posts
		$("a.sized-link").each((i, linkEl) => {
			if (i > this.maxPosts - 1) return;

			const link = "https://www.instagram.com" + linkEl.attribs.href;
			const imageEl = linkEl.firstChild as cheerio.Element;
			const alt = imageEl.attribs.alt;
			const imageUrl =
				this.bibliogramUrl +
				imageEl.attribs.srcset
					.split(",")
					.map(src => src.trim())
					.find(src => src.endsWith("150w"))
					.split(" ")[0];

			this.posts.push({
				alt,
				link,
				imageUrl,
			});
		});

		// info
		const infoDivs = $(".profile-counter .count");
		this.totalPosts = parseInt(infoDivs[0].attribs["data-numberformat"]);
		this.followers = parseInt(infoDivs[1].attribs["data-numberformat"]);
		this.following = parseInt(infoDivs[2].attribs["data-numberformat"]);
	}

	/*
	async getPosts(username: string) {
		const res = await fetch(
			this.bibliogramUrl + "/u/" + username + "/rss.xml",
		);
		const xmlStr = await res.text();
		const xmlObj = fastXmlParser.getTraversalObj(xmlStr);
		const data = fastXmlParser.convertToJson(xmlObj, { arrayMode: false });

		this.posts = [];

		for (let i = 0; i < 6; i++) {
			const post = data.rss.channel.item[i];
			if (post == null) break;

			const { title, link: bibliogramLink, description } = post;

			const imageUrl = description.match(/src="(http[^]+?)"/)[1];
			const link = bibliogramLink.replace(
				this.bibliogramUrl,
				"https://www.instagram.com",
			);

			this.posts.push({
				title,
				link,
				imageUrl,
			});
		}
	}
	*/
}
