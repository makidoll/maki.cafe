import { Component } from "@angular/core";

@Component({
	selector: "vstack",
	templateUrl: "./vstack.component.html",
	host: {
		style: "display: flex; flex-direction: column; align-items: center; justify-content: center;",
	},
})
export class VstackComponent {
	constructor() {}
}
