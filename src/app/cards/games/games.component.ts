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
		"394690", // tower unite
		"413150", // stardew valley
		"620", // portal 2
		"219890", // anti chamber
		"257850", // hyper light drifer
		"275850", // no mans sky
	];

	constructor() {}

	ngOnInit(): void {}
}
