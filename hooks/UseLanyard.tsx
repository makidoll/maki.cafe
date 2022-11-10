import { useEffect, useState } from "react";

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

export function useLanyard(discordId: string) {
	const [data, setData] = useState<DataEvent>();

	const [song, setSong] = useState<CurrentSong | null>();
	const [songTime, setSongTime] = useState<{
		length: number;
		current: number;
	} | null>();

	useEffect(() => {
		let heartbeatInterval: NodeJS.Timer | null;

		let songTimeInterval: NodeJS.Timer | null;

		const processSpotifySong = (data: DataEvent): CurrentSong | null => {
			const song: CurrentSong = data.spotify;
			if (song == null) return null;
			song.track_url = "https://open.spotify.com/track/" + song.track_id;
			song.player = "Spotify";
			return song;
		};

		// there used to be more players like deadbeef and apple music
		// and they'd use musicbrainz to guess cover images
		// TODO: link branch where source code is available

		const clearSongTimeInterval = () => {
			if (songTimeInterval) {
				clearInterval(songTimeInterval);
				songTimeInterval = null;
			}
		};

		const processMusic = (data: DataEvent) => {
			// let song: CurrentSong = this.processDeadBeefSong();
			// if (song == null) song = this.processCiderAppleMusicSong();
			// if (song == null) song = this.processSpotifySong();
			const song = processSpotifySong(data);

			if (song == null) {
				// clean up
				clearSongTimeInterval();
				setSongTime(null);
				setSong(null);
				return;
			}

			setSong(song);

			// if timestamps.end doesnt exist, clean up
			if (song.timestamps.end == null) {
				clearSongTimeInterval();
				setSongTime(null);
			} else {
				const length = song.timestamps.end - song.timestamps.start;

				const updateCurrent = () => {
					const current = Date.now() - song.timestamps.start;
					if (current > song.timestamps.end) return;
					setSongTime({ length, current });
				};

				updateCurrent();

				clearSongTimeInterval();
				songTimeInterval = setInterval(updateCurrent, 1000);
			}
		};

		const onMessage = (event: MessageEvent) => {
			let message: Message | null = null;
			try {
				message = JSON.parse(event.data);
			} catch (error) {
				console.error(error);
			}
			if (message == null) return;

			switch (message.op) {
				case Op.Hello:
					// after hello, init with discord id
					socket.send(
						JSON.stringify({
							op: Op.Initialize,
							d: { subscribe_to_ids: [discordId] },
						} as Message),
					);
					// start the heart beat interval
					heartbeatInterval = setInterval(() => {
						socket.send(
							JSON.stringify({ op: Op.Heartbeat } as Message),
						);
					}, message.d.heartbeat_interval);
					break;

				case Op.Event:
					let data = message.d as DataEvent;
					// seems to only happen for INIT_STATE
					if (data[discordId] != null) {
						data = data[discordId];
					}
					setData(data);
					processMusic(data);
					break;
			}
		};

		const socket = new WebSocket("wss://lanyard.cutelab.space/socket");
		socket.addEventListener("message", onMessage);

		return () => {
			socket.removeEventListener("message", onMessage);
			socket.close();

			if (heartbeatInterval) {
				clearInterval(heartbeatInterval);
				heartbeatInterval = null;
			}
		};
	}, []);

	return { data, song, songTime };
}
