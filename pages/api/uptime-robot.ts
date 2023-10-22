import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { RouterCache } from "../../utils/api/router-cache";
import { config } from "../../utils/config";

export type UptimeRobotStatus = "success" | "warning" | "black";

export type UptimeRobotResponse = {
	psp: {
		monitors: {
			monitorId: number;
			createdAt: number;
			statusClass: UptimeRobotStatus;
			name: string;
			url: string;
			type: string;
			dailyRatios: { ratio: string; label: UptimeRobotStatus }[];
			"90dRatio": { ratio: string; label: UptimeRobotStatus };
			"30dRatio": { ratio: string; label: UptimeRobotStatus };
		}[];
	};
	statistics: {
		uptime: {
			l90: {
				ratio: string;
				label: UptimeRobotStatus;
			};
		};
	};
};

const cache = new RouterCache<UptimeRobotResponse>("uptime-robot");

async function fetchUptimeRobot(): Promise<UptimeRobotResponse> {
	const uptimeRes = await axios(
		"https://stats.uptimerobot.com/api/getMonitorList/" +
			config.socialIds.homelabUptimeRobot +
			"?page=1&_=" +
			Date.now(),
	);

	/*
	let uptime = 0;
	let up = 0;
	let down = 0;

	const monitors = uptimeRes.data?.psp?.monitors ?? [];

	for (const monitor of monitors) {
		uptime += parseFloat(monitor["90dRatio"].ratio);

		if (monitor.statusClass == "success") {
			up++;
		} else {
			down++;
		}
	}

	uptime /= monitors.length;

	return { uptime, up, down };
	*/

	return uptimeRes.data;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<UptimeRobotResponse>,
) {
	try {
		const data = await cache.get(fetchUptimeRobot);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: "something happened sorry" } as any);
		console.error(error);
	}
}
