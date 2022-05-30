import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { shuffleArray } from "../../utils";

@Component({
	selector: "app-homelab-older-yeti",
	templateUrl: "./homelab-older-yeti.component.html",
	styleUrls: ["./homelab-older-yeti.component.scss"],
})
export class HomelabOlderYetiComponent implements OnInit {
	@Output() onSeeNewerSetup = new EventEmitter();

	flopstje = [
		[
			"Tivoli/Cutelab Shared Desktop",
			"https://shared-desktop.tivolicloud.com",
		],
		["Cutelab Squirrels", "https://squirrels.tivolicloud.com"],
		["Emby", "https://emby.media"],
		["Deluge", "https://deluge-torrent.org"],
		["Minecraft", "https://minecraft.net"],
	];

	personalYeti = [
		["Lanyard", "https://lanyard.cutelab.space"],
		["Nitter", "https://nitter.cutelab.space"],
		["Bibliogram", "https://bibliogram.cutelab.space"],
		["Meli", "https://github.com/getmeli/meli"],
		["RSS Bridge", "https://github.com/RSS-Bridge/rss-bridge"],
		["Mastodon", "https://mastodon.cutelab.space"],
		["FreshRSS", "https://freshrss.org"],
		// ["Synapse", "https://github.com/matrix-org/synapse"],
		[
			"Speedtest Tracker",
			"https://github.com/henrywhitaker3/Speedtest-Tracker",
		],
		["Home Assistant", "https://www.home-assistant.io"],
		["Dashmachine", "https://github.com/rmountjoy92/DashMachine"],
		["Seafile", "https://seafile.com/"],
		["Traefik", "https://traefik.io/traefik"],
		["Librespeed", "https://speedtest.cutelab.space"],
		["InvoiceNinja", "https://www.invoiceninja.com"],
		[
			"Speedtest Tracker",
			"https://github.com/henrywhitaker3/Speedtest-Tracker",
		],
	];

	// tivoliYeti = [
	// 	["Website and API", "https://tivolicloud.com"],
	// 	["Ghost blog", "https://blog.tivolicloud.com"],
	// 	["GitLab and runner", "https://git.tivolicloud.com/tivolicloud"],
	// 	["Plausible analytics", "https://plausible.io"],
	// ];

	constructor(private readonly http: HttpClient) {}

	status = "Checking...";

	ngOnInit(): void {
		// this.updateStatus();
	}

	// updateStatus() {
	// 	this.http
	// 		.get<
	// 			{
	// 				name: string;
	// 				icon: string;
	// 				status: "up" | "down";
	// 				uptime: string;
	// 			}[]
	// 		>(
	// 			"https://raw.githubusercontent.com/makitsune/status/master/history/summary.json",
	// 		)
	// 		.subscribe(data => {
	// 			const down = data.filter(
	// 				service => service.status == "down",
	// 			).length;

	// 			const up = data.length - down;

	// 			const uptime =
	// 				data
	// 					.map(service =>
	// 						parseFloat(service.uptime.replace(/%/g, "")),
	// 					)
	// 					.reduce((a, b) => a + b) / data.length;

	// 			this.status = [
	// 				`<b>${uptime == 100 ? 100 : uptime.toFixed(2)}%</b> uptime`,
	// 				`> <b>${up} up</b>`,
	// 				`> <b>${down} down</b>`,
	// 			].join("<br/>");
	// 		});
	// }
}
