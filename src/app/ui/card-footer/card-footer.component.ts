import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-card-footer",
	templateUrl: "./card-footer.component.html",
	styleUrls: ["./card-footer.component.scss"],
})
export class CardFooterComponent implements OnInit {
	@Input() href: string;
	@Input() marginTop = null;
	@Input() marginBottom = null;

	constructor() {}

	ngOnInit(): void {}
}
