import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-material-icon",
	templateUrl: "./material-icon.component.html",
	styleUrls: ["./material-icon.component.scss"],
	host: { class: "material-icons" },
})
export class MaterialIconComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
