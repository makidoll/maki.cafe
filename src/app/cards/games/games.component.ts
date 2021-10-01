import { Component, OnInit } from "@angular/core";
import { config } from "../../config";
import { getBackgroundPositionsForSpritesheet } from "../../utils";
import { steamIds } from "./steam-ids";

@Component({
	selector: "app-games",
	templateUrl: "./games.component.html",
	styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
	config = config;

	profiles = [
		["steam", "Steam", config.socialLinks.steam],
		["playstation", "PSN", config.socialLinks.psnProfiles],
		["osu", "Osu!", config.socialLinks.osu],
	];

	sheetWidth = 4;
	sheetHeight = 5;

	games: { steamId: string; position: string }[] = [];

	constructor() {}

	ngOnInit(): void {
		this.games = getBackgroundPositionsForSpritesheet(
			this.sheetWidth,
			this.sheetHeight,
		).map((position, i) => ({
			steamId: steamIds[i],
			position,
		}));
	}
}
