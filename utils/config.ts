import * as path from "path";

const socialIds = {
	discord: "72139729285427200",
	twitter: "makifoxgirl",
	github: "makifoxgirl",
	instagram: "makifoxgirl",
	soundcloud: "makifoxgirl",
	steam: "makifoxgirl",
	skeb: "@Maki",
	psnProfiles: "makifoxgirl",
	matrix: "@maki:cutelab.space",
	osu: "3286216",
	mfc: "MakiXx_",
	flickr: "125408076@N04",
	homelabUptimeRobot: "GMWojUB9A8",
};

const socialLinks = {
	discord: "https://discord.com/users/" + socialIds.discord,
	twitter: "https://twitter.com/" + socialIds.twitter,
	github: "https://github.com/" + socialIds.github,
	instagram: "https://instagram.com/" + socialIds.instagram,
	soundcloud: "https://soundcloud.com/" + socialIds.soundcloud,
	steam: "https://steamcommunity.com/id/" + socialIds.steam,
	skeb: "https://skeb.jp/" + socialIds.skeb,
	psnProfiles: "https://psnprofiles.com/" + socialIds.psnProfiles,
	matrix: "https://matrix.to/#/" + socialIds.matrix,
	osu: "https://osu.ppy.sh/users/" + socialIds.osu,
	mfc: "https://myfigurecollection.net/" + socialIds.mfc,
	flickr: "https://www.flickr.com/photos/" + socialIds.flickr,
	homelabUptimeRobot:
		"https://stats.uptimerobot.com/" + socialIds.homelabUptimeRobot,
};

export const config = {
	api: {
		lanyard: "wss://lanyard.cutelab.space/socket",
		bibliogram: "https://bibliogram.cutelab.space",
		nitter: "https://nitter.cutelab.space",
	},
	socialIds,
	socialLinks,
	favoriteSteamGames: [
		"210970", // the witness
		"224760", // fez
		"1055540", // a short hike
		"504230", // celeste
		"1332010", // stray
		"524220", // nier automata
		// -- gets smaller
		"620", // portal 2
		"438100", // vrchat
		"972660", // spiritfarer
		"257850", // hyper light drifer
		"219890", // anti chamber
		"1003590", // tetris effect
		"1113560", // nier replicant
		"413150", // stardew valley
		"447040", // watch dogs 2
		"394690", // tower unite
		"963000", // frog detective 1
		"650700", // yume nikki
	],
	favoriteOtherGames: [
		// from https://www.steamgriddb.com
		path.resolve(__dirname, "games/overwatch-2.png"),
		path.resolve(__dirname, "games/earthbound.png"),
		path.resolve(__dirname, "games/catherine-full-body.png"),
		path.resolve(__dirname, "games/super-mario-odyssey.png"),
		path.resolve(__dirname, "games/mother-3.png"),
		path.resolve(__dirname, "games/drakengard-3.png"),
	],
};
