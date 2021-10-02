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
		{ name: "twitter", url: config.socialLinks.twitter },
		{ name: "github", url: config.socialLinks.github },
		{ name: "instagram", url: config.socialLinks.instagram },
		{ name: "steam", url: config.socialLinks.steam },
		{ name: "skeb", url: config.socialLinks.skeb },
		{ name: "element-alt", url: config.socialLinks.matrix },
		{ name: "mfc", url: config.socialLinks.mfc },
	];

	constructor() {}

	ngOnInit(): void {}
}
