import { Component, OnInit } from "@angular/core";
import { config } from "../config";

@Component({
	selector: "app-skeb",
	templateUrl: "./skeb.component.html",
	styleUrls: ["./skeb.component.scss"],
})
export class SkebComponent implements OnInit {
	config = config;
	encodeURIComponent = encodeURIComponent;

	skebs = [
		"2021-09-07 mokarooru_0x0.png",
		"2021-08-15 nhshio.png",
		"2021-08-04 MyugummyCandy.png",
		"2021-07-31 amehakoniwa.png",
		"2021-07-26 saka_14_8.png",
		"2021-07-18 hit0m1417.png",
		"2021-07-17 mitsuki_366.png",
		"2021-07-09 hitosazi0000.png",
		"2021-07-01 kotohatoko510.png",
		"2021-06-13 Yomo_yomotsu.png",
		"2021-06-12 puryurumeuu.png",
		"2021-06-06 hakonatunakann.png",
		"2021-03-04 srn_111.png",
	];

	constructor() {}

	ngOnInit(): void {}
}
