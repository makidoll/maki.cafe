const socialIds = {
	discord: "72139729285427200",
	twitter: "makidrone",
	github: "makidrone",
	instagram: "makidrone_",
	soundcloud: "makidrone",
	steam: "makidrone",
	skeb: "@Maki",
	psnProfiles: "makifoxgirl",
	matrix: "@maki:hotmilk.space",
	osu: "3286216",
	mfc: "MakiXx_",
	flickr: "125408076@N04",
	homelabUptimeRobot: "GMWojUB9A8",
	sketchfab: "makidrone",
	mastodon: {
		instance: "mastodon.hotmilk.space",
		id: "110755825766915676",
		username: "maki",
	},
};

const socialLinks = {
	// discord: "https://discord.com/users/" + socialIds.discord,
	twitter: "https://twitter.com/" + socialIds.twitter,
	github: "https://github.com/" + socialIds.github,
	githubGist: "https://gist.github.com/" + socialIds.github,
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
	sketchfab: "https://sketchfab.com/" + socialIds.sketchfab,
	mastodon: `https://${socialIds.mastodon.instance}/@${socialIds.mastodon.username}`,
	pronounsPage: "https://en.pronouns.page/@makidrone",
};

export const config = {
	api: {
		lanyard: "wss://lanyard.makidrone.io/socket",
		bibliogram: "https://bibliogram.cutelab.space",
		nitter: "https://nitter.cutelab.space",
	},
	socialIds,
	socialLinks,
	styles: {
		hoverTransition: "transform .15s ease-in-out",
	},
	selfHostedLinkMap: {
		"blahaj.quest": "https://blahaj.quest",
		Gitlab: "https://git.hotmilk.space",
		Lemmy: "https://lemmy.hotmilk.space",
		"makidrone.io": "https://makidrone.io",
		Mastodon: "https://mastodon.hotmilk.space",
		Speedtest: "https://speedtest.hotmilk.space",
	},
	selfHostedLinkTooltipMap: {
		"makidrone.io": "or maki.cafe",
	},
};
