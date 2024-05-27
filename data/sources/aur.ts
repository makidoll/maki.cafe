import axios from "axios";
import { DataSource } from "../data-source";
import { config } from "../../utils/config";

interface AurPackage {
	name: string;
	version: string;
	votes: number;
	popularity: string;
	description: string;
	lastModified: number;
}

export type AurDataResponse = AurPackage[];

export class AurData extends DataSource<AurDataResponse> {
	async fetchData() {
		const res = await axios(
			"https://aur.archlinux.org/rpc/v5/search/" +
				config.socialIds.aur +
				"?by=maintainer",
		);

		const results = res.data.results.map(result => ({
			name: result.Name,
			version: result.Version,
			votes: result.NumVotes,
			popularity: result.Popularity.toFixed(2),
			description: result.Description,
			lastModified: result.LastModified,
		}));

		return results;
	}
}
