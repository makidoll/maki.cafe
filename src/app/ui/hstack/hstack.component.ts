import { Component } from "@angular/core";

@Component({
	selector: "hstack",
	templateUrl: "./hstack.component.html",
	host: {
		style: "display: flex; flex-direction: row; align-items: center; justify-content: center;",
	},
})
export class HstackComponent {
	constructor() {}
}
