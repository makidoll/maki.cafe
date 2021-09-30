import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-dancing-letters",
	templateUrl: "./dancing-letters.component.html",
	styleUrls: ["./dancing-letters.component.scss"],
})
export class DancingLettersComponent implements OnInit {
	@Input() text = "";

	letters: string[] = [];

	constructor() {}

	ngOnInit() {
		this.letters = this.text.split("");
	}
}
