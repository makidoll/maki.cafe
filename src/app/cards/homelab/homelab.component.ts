import { Component, OnInit } from "@angular/core";
import { shuffleArray } from "../../utils";

@Component({
	selector: "app-homelab",
	templateUrl: "./homelab.component.html",
	styleUrls: ["./homelab.component.scss"],
})
export class HomelabComponent implements OnInit {
	// personalYeti = shuffleArray([
	personalYeti = [
		["Lanyard", "https://lanyard.cutelab.space"],
		["Nitter", "https://nitter.cutelab.space"],
		["Bibliogram", "https://bibliogram.cutelab.space"],
		["Nitter", "https://nitter.cutelab.space"],
		["Meli", "https://github.com/getmeli/meli"],
		["Pihole", "https://pi-hole.net"],
		["Emby", "https://emby.media/"],
		["Jellyfin", "https://jellyfin.org/"],
		["Plex", "https://www.plex.tv/"],
		["RSS Bridge", "https://github.com/RSS-Bridge/rss-bridge"],
		["Mastodon", "https://mastodon.cutelab.space"],
		["FreshRSS", "https://freshrss.org"],
		["Synapse", "https://github.com/matrix-org/synapse"],
		[
			"Speedtest Tracker",
			"https://github.com/henrywhitaker3/Speedtest-Tracker",
		],
		["Home Assistant", "https://www.home-assistant.io"],
		["Dashmachine", "https://github.com/rmountjoy92/DashMachine"],
		["Seafile", "https://seafile.com/"],
		["Deluge", "https://deluge-torrent.org"],
		["Traefik", "https://traefik.io/traefik"],
		["Librespeed", "https://speedtest.cutelab.space"],
		["InvoiceNinja", "https://www.invoiceninja.com"],
		[
			"Speedtest Tracker",
			"https://github.com/henrywhitaker3/Speedtest-Tracker",
		],
	];
	// ]);

	tivoliYeti = [
		["Website and API", "https://tivolicloud.com"],
		["Ghost blog", "https://blog.tivolicloud.com"],
		["GitLab and runner", "https://git.tivolicloud.com/tivolicloud"],
		["Plausible analytics", "https://plausible.io"],
		["Cardano node", "https://cardano.org"],
	];

	constructor() {}

	ngOnInit(): void {}

	onClick(popup) {
		console.log(popup);
	}
}
