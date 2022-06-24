import { Component, Input, OnChanges } from "@angular/core";

@Component({
	selector: "app-dancing-letters",
	templateUrl: "./dancing-letters.component.html",
	styleUrls: ["./dancing-letters.component.scss"],
})
export class DancingLettersComponent implements OnChanges {
	@Input() text = "";

	letters: string[] = [];
	animating = false;

	constructor() {}

	ngOnChanges() {
		this.letters = this.text.split("");
		this.animating = false;
		setTimeout(() => {
			this.animating = true;
		}, 100);
	}
}
