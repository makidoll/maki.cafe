import { headers } from "next/headers";
import type { ServerData } from "../server/main";
import Home from "./Home";

export default async function Page() {
	const headersList = headers();

	let serverData: ServerData = null;

	try {
		serverData = JSON.parse(headersList.get("server-data"));
	} catch (error) {
		console.error("Failed to get server data");
	}

	return <Home client={serverData.client} data={serverData.data} />;
}
