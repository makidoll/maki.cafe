import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { isScullyRunning } from "@scullyio/ng-lib";
import { BehaviorSubject, interval, Subscription } from "rxjs";
import { config } from "../../config";
import { getImage } from "../../utils";

enum Op {
	Event = 0,
	Hello = 1,
	Initialize = 2,
	Heartbeat = 3,
}

enum Type {
	InitState = "INIT_STATE",
	PresenceUpdate = "PRESENCE_UPDATE",
}

interface Message {
	op: Op;
	t: Type;
	d: Partial<DataEvent & DataHello & DataInitialize>;
}

interface CurrentSong {
	album: string;
	album_art_url: string;
	artist: string;
	song: string;
	timestamps: { start: number; end: number };
	track_id?: string; // only for spotify
	// my fields
	track_url: string; // lets provide this as we're not just using spotify
	player: string;
}

interface DataEvent {
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_web: boolean;
	activities: {
		assets: {
			large_image: string;
			large_text: string;
		};
		created_at: number;
		flags: number;
		id: string;
		name: string;
		party: {
			id: string;
			size: number[];
		};
		session_id: string;
		state: string;
		sync_id: string;
		timestamps: { start: number; end: number };
		type: number;
		application_id: string;
		details: string;
	}[];
	discord_status: "online" | "idle" | "dnd" | "offline";
	discord_user: {
		avatar: string;
		discriminator: string;
		id: string;
		public_flags: number;
		username: string;
	};
	listening_to_spotify: boolean;
	spotify: CurrentSong;
}

interface DataHello {
	heartbeat_interval: number;
}

interface DataInitialize {
	subscribe_to_ids: string[];
}

@Component({
	selector: "app-discord",
	templateUrl: "./discord.component.html",
	styleUrls: ["./discord.component.scss"],
})
export class DiscordComponent implements OnInit, OnDestroy {
	config = config;

	@Input() discordId: string = null;

	socket: WebSocket;
	heartbeatInterval: Subscription;

	data: DataEvent;

	song: CurrentSong;
	songTimeInterval: Subscription;
	songTime: {
		length: number;
		current: BehaviorSubject<number>;
	} = null;

	constructor() {}

	ngOnInit() {
		if (isScullyRunning()) return;

		this.socket = new WebSocket(config.api.lanyard);
		this.socket.addEventListener("message", this.onMessage);
	}

	ngOnDestroy() {
		if (this.socket) {
			this.socket.removeEventListener("message", this.onMessage);
			this.socket.close();
		}
		if (this.heartbeatInterval) {
			this.heartbeatInterval.unsubscribe();
		}
		if (this.songTimeInterval) {
			this.songTimeInterval.unsubscribe();
		}
	}

	msToTime(ms: number) {
		let s = Math.floor(ms / 1000);
		const m = Math.floor(s / 60);
		s -= m * 60;
		return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
	}

	canShowAlbumCover = false;

	async updateCanShowAlbumCover() {
		if (this.song != null && this.song.album_art_url != "") {
			try {
				await getImage(this.song.album_art_url);
				this.canShowAlbumCover = true;
			} catch (error) {
				this.canShowAlbumCover = false;
			}
		} else {
			this.canShowAlbumCover = false;
		}
	}

	processSpotifySong(): CurrentSong {
		const song: CurrentSong = this.data.spotify;
		if (song == null) return null;
		song.track_url = "https://open.spotify.com/track/" + song.track_id;
		song.player = "Spotify";
		return song;
	}

	dataFromMusicSearchCache: {
		[search: string]: { imageUrl: string; trackUrl: string };
	} = {};

	async getDataFromMusicSearch(
		search: string,
	): Promise<{ imageUrl: string; trackUrl: string }> {
		if (this.dataFromMusicSearchCache[search]) {
			return this.dataFromMusicSearchCache[search];
		}

		try {
			const limit = 5;
			const res = await fetch(
				"https://musicbrainz.org/ws/2/release?fmt=json&limit=" +
					limit +
					"&dismax=false&query=release:" +
					encodeURIComponent(search),
			);
			const data = await res.json();
			if (data.releases.length == 0) return null;

			let idsToQuery = data.releases.map(release => release.id);

			let id = null;
			let imageUrl = null;

			for (const currentId of idsToQuery) {
				const currentImageUrl =
					"http://coverartarchive.org/release/" +
					currentId +
					"/front-250";
				try {
					await getImage(currentImageUrl);
					id = currentId;
					imageUrl = currentImageUrl;
					break;
				} catch (error) {}
			}

			const out = {
				imageUrl,
				trackUrl: "https://musicbrainz.org/release/" + id,
			};

			this.dataFromMusicSearchCache[search] = out;

			return out;
		} catch (error) {
			return null;
		}
	}

	processDeadBeefSong(): CurrentSong {
		const activity = (this.data.activities ?? []).find(
			activity => activity.name == "DeaDBeeF",
		);
		if (activity == null) return null;

		const song: CurrentSong = {
			// i could try to regex this, but im not using it in the ui
			// album: activity.assets.large_text
			album: "",
			album_art_url: "",
			artist: activity.state.trim(),
			song: activity.details.trim(),
			timestamps: {
				start: activity.timestamps.start,
				end: activity.timestamps.end,
			},
			track_url: "",
			player: "DeaDBeeF",
		};

		// lets not await this so we can add art when its available
		setTimeout(() => {
			this.getDataFromMusicSearch(activity.assets.large_text).then(
				data => {
					if (data == null) return;
					this.song.album_art_url = data.imageUrl;
					this.song.track_url = data.trackUrl;
					this.updateCanShowAlbumCover();
				},
			);
		}, 10);

		return song;
	}

	processCiderAppleMusicSong(): CurrentSong {
		const activity = (this.data.activities ?? []).find(
			activity =>
				activity.name == "Cider" || activity.name == "Apple Music",
		);
		if (activity == null) return null;

		let album_art_url = "";
		const albumArtMatches =
			activity.assets.large_image.match(/(https?[^]+?$)/);
		if (albumArtMatches != null) {
			album_art_url = albumArtMatches[1]
				.replace(/^(https?)\//, "$1://")
				.trim();
		}

		const song: CurrentSong = {
			album: activity.assets.large_text,
			album_art_url,
			artist: activity.state.replace(/^by /i, "").trim(),
			song: activity.details.trim(),
			timestamps: {
				start: activity.timestamps.start,
				end: activity.timestamps.end,
			},
			track_url: "",
			player: "Apple Music",
		};

		// lets not await this so we can add art when its available
		setTimeout(() => {
			// this will get the album art too but i think its okay
			this.getDataFromMusicSearch(activity.assets.large_text).then(
				data => {
					if (data == null) return;
					this.song.track_url = data.trackUrl;
					// dont need the album art url but maybe i should if empty
					// this.song.album_art_url = data.imageUrl;
					// this.updateCanShowAlbumCover();
				},
			);
		}, 10);

		return song;
	}

	processMusic() {
		let song: CurrentSong = this.processDeadBeefSong();
		if (song == null) song = this.processCiderAppleMusicSong();
		if (song == null) song = this.processSpotifySong();

		if (song == null) {
			// clean up
			if (this.songTimeInterval) this.songTimeInterval.unsubscribe();
			this.songTime = null;
			this.song = null;
			this.updateCanShowAlbumCover();
			return;
		}

		// set this.song for ui
		this.song = song;
		this.updateCanShowAlbumCover();

		// if timestamps.end doesnt exist, clean up
		if (song.timestamps.end == null) {
			if (this.songTimeInterval) this.songTimeInterval.unsubscribe();
			this.songTime = null;
		} else {
			const length = song.timestamps.end - song.timestamps.start;

			const updateCurrent = () => {
				if (this.songTime) {
					const current = Date.now() - song.timestamps.start;
					if (current > song.timestamps.end) return;
					this.songTime.current.next(current);
				}
			};

			this.songTime = { length, current: new BehaviorSubject(0) };

			updateCurrent();

			if (this.songTimeInterval) this.songTimeInterval.unsubscribe();
			this.songTimeInterval = interval(1000).subscribe(() => {
				updateCurrent();
			});
		}
	}

	onData() {
		this.processMusic();
	}

	private onMessage = (event: MessageEvent) => {
		let message: Message;
		try {
			message = JSON.parse(event.data);
		} catch (error) {
			console.error(error);
		}
		if (message == null) return;

		switch (message.op) {
			case Op.Hello:
				// after hello, init with discord id
				this.socket.send(
					JSON.stringify({
						op: Op.Initialize,
						d: { subscribe_to_ids: [this.discordId] },
					} as Message),
				);
				// start the heart beat interval
				this.heartbeatInterval = interval(
					message.d.heartbeat_interval,
				).subscribe(() => {
					this.socket.send(
						JSON.stringify({ op: Op.Heartbeat } as Message),
					);
				});
				break;

			case Op.Event:
				let data = message.d as DataEvent;
				// seems to only happen for INIT_STATE
				if (data[this.discordId] != null) {
					data = data[this.discordId];
				}
				this.data = data;
				this.onData();
				break;
		}
	};
}
