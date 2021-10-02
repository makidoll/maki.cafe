import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
	selector: "app-popup-box",
	templateUrl: "./popup-box.component.html",
	styleUrls: ["./popup-box.component.scss"],
})
export class PopupBoxComponent implements OnInit {
	@ViewChild("popupBox", { static: false })
	popupBox: ElementRef<HTMLDivElement>;
	@ViewChild("closeButton", { static: false })
	closeButton: ElementRef<HTMLDivElement>;

	isOpen = false;
	opacity = "0";

	private transitionTime = 150;

	constructor() {}

	ngOnInit(): void {}

	open() {
		// if (this.isOpen) return;
		this.isOpen = true;
		setTimeout(() => {
			this.opacity = "1";
		}, 10);
	}

	close(event: MouseEvent) {
		if (!this.isOpen) return;
		if (
			event.target == this.popupBox.nativeElement ||
			(event.target as any).parentNode == this.closeButton.nativeElement
		) {
			this.opacity = "0";
			setTimeout(() => {
				this.isOpen = false;
			}, this.transitionTime + 10);
		}
	}
}
