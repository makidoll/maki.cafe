import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
	selector: "svg[logoIcon]",
})
export class LogoIconDirective implements OnInit {
	@Input("logoIcon") icon: string = "";

	constructor(private readonly el: ElementRef<SVGElement>) {}

	ngOnInit() {
		if (this.icon == "") return;
		const svg = this.el.nativeElement;

		const iconModule = require("./logo-icons/" +
			this.icon.toLowerCase() +
			".svg");
		if (iconModule == null) return;

		// parse svg string to element with a fake parent

		const fakeParent = document.createElement("div");
		fakeParent.innerHTML = iconModule.default;
		const iconSvg = fakeParent.children[0];

		// merge icon svg with our element
		// and make sure there is no width and height, only viewbox

		svg.innerHTML = iconSvg.innerHTML;

		const attrs = {};
		for (const attr of Array.from(iconSvg.attributes)) {
			if (attr.name.startsWith("xml")) continue; // dont need it
			attrs[attr.name] = attr.value;
		}

		if (!attrs["viewBox"]) {
			attrs["viewBox"] = `0 0 ${attrs["width"]} ${attrs["height"]}`;
		}
		if (attrs["width"]) delete attrs["width"];
		if (attrs["height"]) delete attrs["height"];

		for (const [name, value] of Object.entries<string>(attrs)) {
			if (name == "style" && svg.attributes["style"]) {
				// append new style onto svg style
				const style = svg.attributes["style"].value.trim();
				svg.setAttribute(
					"style",
					value + (value.endsWith(";") ? "" : ";") + style,
				);
			} else {
				svg.setAttribute(name, value);
			}
		}

		// destroy fake parent

		fakeParent.remove();
	}
}
