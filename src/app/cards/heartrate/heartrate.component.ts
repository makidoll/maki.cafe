import { Component, OnInit } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";

interface Metric {
	since: Date;
	amount: number;
}

interface Metrics {
	restingHeartRate: Metric;
	walkingHeartRate: Metric;
	currentHeartRate: Metric;
	stepCount: Metric;
}

@Component({
	selector: "app-heartrate",
	templateUrl: "./heartrate.component.html",
	styleUrls: ["./heartrate.component.scss"],
})
export class HeartrateComponent implements OnInit {
	currentMetrics: Metrics = null;

	constructor() {}

	async getCurrentMetrics() {
		const res = await fetch("https://heartrate.maki.cafe/api");
		const currentMetrics: Metrics = await res.json();
		for (const key of Object.keys(currentMetrics)) {
			const since = currentMetrics[key].since;
			const matches = since.match(
				/^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/,
			);
			if (matches != null) {
				currentMetrics[key].since = new Date(
					matches[1],
					matches[2] - 1,
					matches[3],
				);
			} else {
				currentMetrics[key].since = new Date(currentMetrics[key].since);
			}
		}
		this.currentMetrics = currentMetrics;
	}

	ngOnInit() {
		if (isScullyRunning()) return;

		this.getCurrentMetrics();
	}
}
