const socialHandles = {
	discord: "72139729285427200",
	twitter: "makifoxgirl",
	github: "makifoxgirl",
	instagram: "MakiXx_",
	soundcloud: "makifoxgirl",
	steam: "makifoxgirl",
	skeb: "@Maki",
	psnProfiles: "makifoxgirl",
	matrix: "@maki:cutelab.space",
	osu: "3286216",
	mfc: "MakiXx_",
	flickr: "125408076@N04",
};

export const config = {
	api: {
		lanyard: "wss://lanyard.cutelab.space/socket",
		bibliogram: "https://bibliogram.cutelab.space",
		nitter: "https://nitter.cutelab.space",
	},
	socialHandles,
	socialLinks: {
		discord: "https://discord.com/users/" + socialHandles.discord,
		twitter: "https://twitter.com/" + socialHandles.twitter,
		github: "https://github.com/" + socialHandles.github,
		instagram: "https://instagram.com/" + socialHandles.instagram,
		soundcloud: "https://soundcloud.com/" + socialHandles.soundcloud,
		steam: "https://steamcommunity.com/id/" + socialHandles.steam,
		skeb: "https://skeb.jp/" + socialHandles.skeb,
		psnProfiles: "https://psnprofiles.com/" + +socialHandles.psnProfiles,
		matrix: "https://matrix.to/#/" + socialHandles.matrix,
		osu: "https://osu.ppy.sh/users/" + socialHandles.osu,
		mfc: "https://myfigurecollection.net/" + socialHandles.mfc,
		flickr: "https://www.flickr.com/photos/" + socialHandles.flickr,
	},
};
