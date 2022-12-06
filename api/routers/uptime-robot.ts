import axios from "axios";
import { config } from "../../utils/config";
import { baseProcedure, router } from "../trpc";
import { RouterCache } from "../router-cache";

type Response = {
	uptime: number;
	up: number;
	down: number;
};

const cache = new RouterCache<Response>("uptime-robot");

async function fetchUptimeRobot() {
	const uptimeRes = await axios(
		"https://stats.uptimerobot.com/api/getMonitorList/" +
			config.socialIds.homelabUptimeRobot +
			"?page=1&_=" +
			Date.now(),
	);

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
}

export const uptimeRobotRouter = router({
	all: baseProcedure
		// .input(
		// 	z.object({
		// 		name: z.string().nullish(),
		// 	}),
		// )
		.query(async ({ input }): Promise<Response> => {
			// if (process.env.NODE_ENV == "development") {
			// 	return { uptime: 98.54321, up: 40, down: 20 };
			// }

			return await cache.get(fetchUptimeRobot);
		}),
});
