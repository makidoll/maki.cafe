import { Component, OnInit } from "@angular/core";
import { config } from "../../config";
import { mfcData } from "./mfc";

@Component({
	selector: "app-mfc",
	templateUrl: "./mfc.component.html",
	styleUrls: ["./mfc.component.scss"],
})
export class MfcComponent implements OnInit {
	config = config;
	mfcData = mfcData;

	constructor() {}

	ngOnInit(): void {}
}
