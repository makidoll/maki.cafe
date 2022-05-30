import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { shuffleArray } from "../../utils";

@Component({
	selector: "app-homelab",
	templateUrl: "./homelab.component.html",
	styleUrls: ["./homelab.component.scss"],
})
export class HomelabComponent implements OnInit {
	showOlderYeti = false;

	macMini = [["Say server", "https://say.cutelab.space"]];

	blahajMedia = [
		["qBittorrent", "https://www.qbittorrent.org"],
		["Radarr", "https://radarr.video/"],
		["Mullvad VPN", "https://mullvad.net/en"],
		["Emby", "https://emby.media"],
	];

	blahajFiles = [
		["Samba", "https://github.com/ServerContainers/samba"],
		["Seafile", "https://seafile.com/"],
		[
			"Unity Accelerator",
			"https://hub.docker.com/r/unitytechnologies/accelerator",
		],
	];

	blahajSocial = [
		["Synapse", "https://github.com/matrix-org/synapse"],
		["Mastodon", "https://mastodon.cutelab.space"],
		["Nitter", "https://nitter.cutelab.space"],
		["Bibliogram", "https://bibliogram.cutelab.space"],
		["Lanyard", "https://lanyard.cutelab.space"],
	];

	blahajDev = [
		["Gitea", "https://gitea.io"],
		["Meli", "https://github.com/getmeli/meli"],
		["Tileserver GL", "https://github.com/maptiler/tileserver-gl"],
		["Traefik", "https://traefik.io/traefik"],
	];

	blahajHome = [
		["Home Assistant", "https://www.home-assistant.io"],
		["Scrypted", "https://www.scrypted.app"],
		["Cutelab Squirrels", "https://squirrels.tivolicloud.com"],
		["Librespeed", "https://speedtest.cutelab.space"],
	];

	blahajPersonal = [
		["Homer", "https://github.com/bastienwirtz/homer"],
		["FreshRSS", "https://freshrss.org"],
		["RSS Bridge", "https://github.com/RSS-Bridge/rss-bridge"],
		["Blåhaj Finder", "https://blahaj.quest"],
		["Grafana + Prometheus", "https://grafana.com"],
		["InvoiceNinja", "https://www.invoiceninja.com"],
		["Maki Upload", "https://maki.cafe/u"],
	];

	constructor(private readonly http: HttpClient) {}

	status = "Checking...";

	ngOnInit(): void {
		this.updateStatus();
	}

	updateStatus() {
		this.http
			.get<
				{
					name: string;
					icon: string;
					status: "up" | "down";
					uptime: string;
				}[]
			>(
				"https://raw.githubusercontent.com/makitsune/status/master/history/summary.json",
			)
			.subscribe(data => {
				const down = data.filter(
					service => service.status == "down",
				).length;

				const up = data.length - down;

				const uptime =
					data
						.map(service =>
							parseFloat(service.uptime.replace(/%/g, "")),
						)
						.reduce((a, b) => a + b) / data.length;

				this.status = [
					`<b>${uptime == 100 ? 100 : uptime.toFixed(2)}%</b> uptime`,
					`> <b>${up} up</b>`,
					`> <b>${down} down</b>`,
				].join("<br/>");
			});
	}
}
