import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
	selector: "app-emoji",
	templateUrl: "./emoji.component.html",
	styleUrls: ["./emoji.component.scss"],
})
export class EmojiComponent implements OnInit {
	@Input() emoji: string = "";

	imageUrl: SafeResourceUrl = "";

	customEmojis = ["lesbian-flag"];

	constructor(private readonly domSanitizer: DomSanitizer) {}

	ngOnInit() {
		if (this.customEmojis.includes(this.emoji)) {
			const emojiModule = require("./custom-emojis/" +
				this.emoji.toLowerCase() +
				".svg");

			this.imageUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
				"data:image/svg+xml;base64," + btoa(emojiModule.default),
			);
		} else {
			this.imageUrl =
				"https://twemoji.maxcdn.com/2/svg/" +
				this.toCodePoint(this.emoji, "-") +
				".svg";
		}
	}

	// https://twemoji.maxcdn.com/v/latest/twemoji.js
	toCodePoint(unicodeSurrogates: string, sep: string = "-") {
		let r = [],
			c = 0,
			p = 0,
			i = 0;
		while (i < unicodeSurrogates.length) {
			c = unicodeSurrogates.charCodeAt(i++);
			if (p) {
				r.push(
					(0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(
						16,
					),
				);
				p = 0;
			} else if (0xd800 <= c && c <= 0xdbff) {
				p = c;
			} else {
				r.push(c.toString(16));
			}
		}
		return r.join(sep);
	}
}
