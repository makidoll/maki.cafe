import Home from "./Home";
import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { LatestData } from "../data/data-sources-server";

const cacheDir = path.resolve(process.env.APP_ROOT ?? "", "cache");

async function getLatestData() {
	const files = await fs.readdir(cacheDir);

	const data: { [key: string]: any } = {};

	for (const filename of files) {
		try {
			const fileData = await fs.readFile(
				path.resolve(cacheDir, filename),
				"utf8",
			);

			const value = JSON.parse(fileData).data;

			let key = filename.replace(/\.json$/i, "");

			// convert to camelCase
			const matches = Array.from(key.matchAll(/-([a-z])/gi));
			for (const match of matches) {
				key = key.replace(match[0], match[1].toUpperCase());
			}

			data[key] = value;
		} catch (error) {
			console.log("Failed to read cache: " + filename);
			console.error(error);
		}
	}

	return data as LatestData;
}

export default async function Page() {
	const headersList = headers();

	const data = await getLatestData();

	// TODO: fix isMobile

	// console.log(headersList);
	// console.log(headersList.keys());
	// const contentType = headersList.get("Content-Type");
	// console.log(contentType);

	return <Home isMobile={false} data={data} />;
}
