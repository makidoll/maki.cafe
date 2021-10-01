import { Component, Input } from "@angular/core";

@Component({
	selector: "app-user-image",
	templateUrl: "./user-image.component.html",
	styleUrls: ["./user-image.component.scss"],
})
export class UserImageComponent {
	@Input() size = 32;
	@Input() url = "";

	@Input() status: "online" | "idle" | "dnd" | "offline" = "online";
	@Input() mobile = false;

	constructor() {}
}
