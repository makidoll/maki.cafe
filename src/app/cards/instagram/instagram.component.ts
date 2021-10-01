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
	readonly bibliogramUrl = "https://bibliogram.cutelab.space";

	config = config;

	@Input() username: string;

	posts: Post[] = [];

	constructor() {}

	ngOnInit(): void {
		if (isScullyRunning()) return;

		this.getPosts(this.username);
	}

	async getPosts(username: string) {
		const res = await fetch(this.bibliogramUrl + "/u/" + username);
		const htmlStr = await res.text();
		const $ = cheerio.load(htmlStr);

		$("a.sized-link").each((i, linkEl) => {
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
