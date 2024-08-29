import * as http from "http";
import next from "next";
import UAParser from "ua-parser-js";
import * as url from "url";
import { DataSources, LatestData } from "./data-sources";

const port = process.env.PORT ?? 3000;
const dev = process.env.NODE_ENV !== "production";

export interface ServerData {
	isMobile: boolean;
	isSafari: boolean;
	data: LatestData;
}

(async () => {
	// const expressApp = express();

	const nextApp = next({ dev });
	await nextApp.prepare();

	const nextHandler = nextApp.getRequestHandler();

	const dataSources = new DataSources();

	function handler(req: http.IncomingMessage, res: http.ServerResponse) {
		const parsedUrl = url.parse(req.url!, true);

		// if (parsedUrl.path.startsWith("/api")) {
		// 	expressApp(req, res);
		// }

		const ua = new UAParser(req.headers["user-agent"]);

		const isMobile = ua.getDevice().type == "mobile";
		const isSafari = ua.getBrowser().name == "Safari";

		const serverData: ServerData = {
			isMobile,
			isSafari,
			data: dataSources.getLatest(),
		};

		req.headers["server-data"] = JSON.stringify(serverData);

		nextHandler(req, res, parsedUrl);
	}

	const server = http.createServer(handler);

	server.listen(port);

	console.log(
		`> Server listening at http://localhost:${port} as ${
			dev ? "development" : process.env.NODE_ENV
		}`,
	);
})();
