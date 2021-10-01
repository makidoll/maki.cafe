import { Component, OnInit } from "@angular/core";
import { config } from "../../config";

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
		let skebs: string[] = [];
		for (let i = 0; i < this.sheetWidth * this.sheetHeight; i++) {
			const x = i % this.sheetWidth;
			const y = Math.floor(i / this.sheetWidth);
			skebs.push(
				[
					(x / (this.sheetWidth - 1)) * 100 + "%",
					(y / (this.sheetHeight - 1)) * 100 + "%",
				].join(" "),
			);
		}
		this.skebs = skebs;
	}
}
