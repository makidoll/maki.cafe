import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, Input, OnInit, PLATFORM_ID } from "@angular/core";
import * as fastXmlParser from "fast-xml-parser";
import { config } from "../../config";

interface Post {
	title: string;
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

	constructor(@Inject(PLATFORM_ID) private readonly platformId) {}

	ngOnInit(): void {
		if (!isPlatformBrowser(this.platformId)) return;

		this.getPosts(this.username);
	}

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
}
