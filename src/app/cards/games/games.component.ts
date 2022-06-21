import { Component, OnInit } from "@angular/core";
import { config } from "../../config";
import { getBackgroundPositionsForSpritesheet } from "../../utils";
import { gamesInfo } from "./games-info";

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

	gamesInfo = gamesInfo;
	gamesWithPosition: { steamId: string; position: string }[] = [];

	constructor() {}

	ngOnInit(): void {
		this.gamesWithPosition = getBackgroundPositionsForSpritesheet(
			gamesInfo.sheetWidth,
			gamesInfo.sheetHeight,
		).map((position, i) => ({
			steamId: gamesInfo.steamIds[i],
			position,
		}));
	}
}
