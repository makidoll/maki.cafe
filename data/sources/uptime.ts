import axios from "axios";
import { DataSource } from "../data-source";

// export type UptimeStatus = "success" | "warning" | "black";

// export type UptimeResponse = {
// 	psp: {
// 		monitors: {
// 			monitorId: number;
// 			createdAt: number;
// 			statusClass: UptimeStatus;
// 			name: string;
// 			url: string;
// 			type: string;
// 			dailyRatios: { ratio: string; label: UptimeStatus }[];
// 			"90dRatio": { ratio: string; label: UptimeStatus };
// 			"30dRatio": { ratio: string; label: UptimeStatus };
// 		}[];
// 	};
// 	statistics: {
// 		uptime: {
// 			l90: {
// 				ratio: string;
// 				label: UptimeStatus;
// 			};
// 		};
// 	};
// };

// export enum UptimeStatus {
// 	None = -1,
// 	Offline = 0,
// 	Online = 1,
// }

export type UptimeStatus = -1 | 0 | 1;

export type UptimeDataResponse = {
	name: string;
	url: string;
	uptime24h: number;
	// status: UptimeStatus;
	heartbeat: UptimeStatus[];
}[];

export class UptimeData extends DataSource<UptimeDataResponse> {
	protected intervalMinutes = 5;

	async fetchData() {
		const uptimeRes = await axios(
			"https://uptime.hotmilk.space/status/hotmilk?" + Date.now(),
		);

		const matches = uptimeRes.data.match(
			/window\.preloadData = ({[^]+?});/,
		);
		if (matches == null) return [];

		const preloadData = eval("(" + matches[1] + ")");

		const uptimeHeartbeatRes = await axios(
			"https://uptime.hotmilk.space/api/status-page/heartbeat/hotmilk?" +
				Date.now(),
		);

		const response: UptimeDataResponse = [];

		const heartbeatLength = 50;

		for (const group of preloadData.publicGroupList) {
			for (const monitor of group.monitorList) {
				let heartbeat =
					uptimeHeartbeatRes.data.heartbeatList[monitor.id];
				if (heartbeat == null) heartbeat = [];

				// should be 50 length but make sure its never more. then map status
				heartbeat = heartbeat
					.slice(-heartbeatLength)
					.map(h => h.status);

				if (heartbeat.length < heartbeatLength) {
					const missingLength = heartbeatLength - heartbeat.length;
					heartbeat = [
						...new Array(missingLength).fill(-1),
						...heartbeat,
					];
				}

				response.push({
					name: monitor.name,
					url: monitor.url,
					uptime24h:
						uptimeHeartbeatRes.data.uptimeList[monitor.id + "_24"],
					// status: heartbeat[heartbeat.length - 1],
					heartbeat,
				});
			}
		}

		return response;
	}
}
