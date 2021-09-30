import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-emoji",
	templateUrl: "./emoji.component.html",
	styleUrls: ["./emoji.component.scss"],
})
export class EmojiComponent implements OnInit {
	@Input() emoji: string = "";

	code: string = "";

	constructor() {}

	ngOnInit() {
		this.code = this.toCodePoint(this.emoji, "-");
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
