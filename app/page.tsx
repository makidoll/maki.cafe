import { headers } from "next/headers";
import { ServerData } from "../server/main";
import Home from "./Home";

export default async function Page() {
	const headersList = headers();

	let serverData: ServerData = null;

	try {
		serverData = JSON.parse(headersList.get("server-data"));
	} catch (error) {
		console.error("Failed to get server data");
	}

	return (
		<Home
			isMobile={serverData.isMobile}
			isSafari={serverData.isSafari}
			data={serverData.data}
		/>
	);
}
