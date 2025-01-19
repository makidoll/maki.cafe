import * as http from "http";
import next from "next";
import UAParser from "ua-parser-js";
import * as url from "url";
import { config } from "../utils/config";
import { DataSources, LatestData } from "./data-sources";

const port = process.env.PORT ?? 3000;
const dev = process.env.NODE_ENV !== "production";

export interface ClientInfo {
	isMobile: boolean;
	isSafari: boolean;
}

export interface ServerData {
	client: ClientInfo;
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

		const githubMatches = parsedUrl.path.match(/\/gh(\/[^/]+)?(\/page)?$/i);

		if (githubMatches != null) {
			const path = githubMatches[1];
			const pages = githubMatches[2] != null;

			if (path == null) {
				res.writeHead(302, {
					location: config.socialLinks.github,
				});
			} else {
				res.writeHead(302, {
					location: pages
						? "https://" +
						  config.socialIds.github +
						  ".github.io" +
						  path
						: config.socialLinks.github + path,
				});
			}

			res.end();
			return;
		}

		const ua = new UAParser(req.headers["user-agent"]);

		const isMobile = ua.getDevice().type == "mobile";
		const isSafari = ua.getBrowser().name == "Safari";

		const serverData: ServerData = {
			client: { isMobile, isSafari },
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
