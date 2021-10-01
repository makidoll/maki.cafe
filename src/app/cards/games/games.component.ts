import { Component, OnInit } from "@angular/core";
import { config } from "../../config";

@Component({
	selector: "app-games",
	templateUrl: "./games.component.html",
	styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
	config = config;

	steamIds = [
		"972660", // spiritfarer
		"210970", // the witness
		"524220", // nier automata
		"1113560", // nier replicant
		"504230", // celeste
		"447040", // watch dogs 2
	];

	moreSteamIds = [
		"438100", // vrchat
		"224760", // fez
		"620", // portal 2
		"257850", // hyper light drifer
		"219890", // anti chamber
		"413150", // stardew valley
		"394690", // tower unite
		"275850", // no mans sky
	];

	urls = [
		"/assets/games/earthbound-steam-horizontal.png",
		"/assets/games/catherine-full-body-steam-horizontal.png",
		"/assets/games/super-mario-odyssey-steam-horizontal.png",
	];

	profiles = [
		["steam", "Steam", config.socialLinks.steam],
		["playstation", "PSN", config.socialLinks.psnProfiles],
		["osu", "Osu!", config.socialLinks.osu],
	];

	constructor() {}

	ngOnInit(): void {}
}
