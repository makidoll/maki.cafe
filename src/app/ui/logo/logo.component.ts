import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-logo",
	templateUrl: "./logo.component.html",
	styleUrls: ["./logo.component.scss"],
})
export class LogoComponent implements OnInit {
	animateForward = false;
	animateBackward = false;
	animateHide = false;
	animating = false;

	constructor() {}

	readonly animationForwardTime = 2800;
	readonly animationBackwardTime = 1400;

	ngOnInit(): void {
		// this.animating = true; // make sure cant click when init
		// setTimeout(() => {
		// 	this.animating = false;
		// 	this.animateHide = false;
		// 	this.playForward();
		// }, 500);
		this.playForward();
	}

	onClick() {
		this.playBackward();
	}

	playForward(force = false) {
		if (this.animating && !force) return;

		this.animating = true;
		this.animateForward = true;
		setTimeout(() => {
			this.animateForward = false;
			this.animating = false;
			// console.log("forward done");
		}, this.animationForwardTime);
	}

	playBackward() {
		if (this.animating) return;

		this.animating = true;
		this.animateBackward = true;
		setTimeout(() => {
			this.animateHide = true; // or it will flash the logo
			this.animateBackward = false;
			// console.log("backward done");
			// css needs to acclimate
			setTimeout(() => {
				this.playForward(true); // will finally finish animation
				this.animateHide = false;
			}, 100);
		}, this.animationBackwardTime);
	}
}
