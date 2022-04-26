import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { config } from "../../config";
import * as fetchJsonp from "fetch-jsonp";

interface Post {
	title: string;
	link: string;
	media: { m: string };
	date_taken: string;
	description: string;
	published: string;
	author: string;
	author_id: string;
	tags: string;
}

@Component({
	selector: "app-photos",
	templateUrl: "./photos.component.html",
	styleUrls: ["./photos.component.scss"],
})
export class PhotosComponent implements OnInit {
	readonly config = config;
	readonly feedUrl =
		"https://www.flickr.com/services/feeds/photos_public.gne?id=" +
		config.flickrId +
		"&format=json&lang=en-us";

	posts: Post[] = [];

	constructor() {}

	async ngOnInit() {
		const res = await fetchJsonp(this.feedUrl, {
			jsonpCallbackFunction: "jsonFlickrFeed",
		});

		const data: {
			items: Post[];
		} = await res.json();

		this.posts = data.items.slice(0, 20);
	}
}
