import { Component, OnInit } from "@angular/core";
import { config } from "../config";

@Component({
	selector: "app-social",
	templateUrl: "./social.component.html",
	styleUrls: ["./social.component.scss"],
})
export class SocialComponent implements OnInit {
	social: { name: string; url: string }[] = [
		{
			name: "discord",
			url: "https://discord.com/users/" + config.discordId,
		},
		{ name: "twitter", url: "https://twitter.com/MakiXx_" },
		{ name: "github", url: "https://github.com/makitsune" },
		{ name: "instagram", url: "https://instagram.com/MakiXx" },
		{ name: "steam", url: "https://steamcommunity.com/id/MakiXx" },
	];

	constructor() {}

	ngOnInit(): void {}
}
