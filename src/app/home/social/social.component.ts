import { Component, OnInit } from "@angular/core";
import { config } from "../../config";

@Component({
	selector: "app-social",
	templateUrl: "./social.component.html",
	styleUrls: ["./social.component.scss"],
})
export class SocialComponent implements OnInit {
	social: { name: string; url: string }[] = [
		{ name: "discord", url: config.socialLinks.discord },
		// { name: "twitter", url: config.socialLinks.twitter },
		{ name: "github", url: config.socialLinks.github },
		{ name: "steam", url: config.socialLinks.steam },
		{ name: "element-alt", url: config.socialLinks.matrix },
		// { name: "flickr", url: config.socialLinks.flickr },
		{ name: "soundcloud", url: config.socialLinks.soundcloud },
	];

	constructor() {}

	ngOnInit(): void {}
}
