import { Component, OnInit } from "@angular/core";
import { config } from "../config";
import { environment } from "../../environments/environment";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	config = config;
	environment = environment;

	constructor() {}

	ngOnInit(): void {}
}
