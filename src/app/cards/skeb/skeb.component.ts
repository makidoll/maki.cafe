import { Component, OnInit } from "@angular/core";
import { config } from "../../config";
import { getBackgroundPositionsForSpritesheet } from "../../utils";

@Component({
	selector: "app-skeb",
	templateUrl: "./skeb.component.html",
	styleUrls: ["./skeb.component.scss"],
})
export class SkebComponent implements OnInit {
	config = config;
	encodeURIComponent = encodeURIComponent;

	sheetWidth = 4;
	sheetHeight = 3;

	skebs: string[] = [];

	constructor() {}

	ngOnInit(): void {
		this.skebs = getBackgroundPositionsForSpritesheet(
			this.sheetWidth,
			this.sheetHeight,
		);
	}
}
