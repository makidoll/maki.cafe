import axios from "axios";
import { config } from "../../utils/config";
import { DataSource } from "../data-source";

interface MastodonStatus {
	content: string;
	created_at: string;
	sensitive: boolean;
	emojis: { shortcode: string; url: string }[];
	account: {
		acct: string;
		avatar: string;
		display_name: string;
	};
	url: string;
	media_attachments: {
		url: string;
		preview_url: string;
		type: "image";
	}[];
}

interface MastodonImage {
	url: string;
	sensitive: boolean;
	image_url: string;
}

export type MastodonDataResponse = MastodonImage[];

export class MastodonData extends DataSource<MastodonDataResponse> {
	async fetchData() {
		// https://docs.joinmastodon.org/methods/accounts/#statuses

		const statusesUrl = new URL(
			`https://${config.socialIds.mastodon.instance}/api/v1/accounts/${config.socialIds.mastodon.id}/statuses`,
		);

		statusesUrl.searchParams.set("pinned", "false");
		statusesUrl.searchParams.set("only_media", "true");
		statusesUrl.searchParams.set("exclude_replies", "true");
		statusesUrl.searchParams.set("exclude_reblogs", "true");

		const res = await axios<MastodonStatus[]>(statusesUrl.href);
		const images: MastodonImage[] = [];

		for (const status of res.data) {
			for (const media_attachment of status.media_attachments) {
				if (media_attachment.type != "image") continue;

				images.push({
					url: status.url,
					sensitive: status.sensitive,
					image_url: media_attachment.preview_url,
				});
			}
		}

		return images.slice(0, 20);
	}
}
