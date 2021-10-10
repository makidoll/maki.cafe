import {
	Component,
	ComponentFactoryResolver,
	ElementRef,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
} from "@angular/core";

@Component({
	selector: "app-squirrels",
	templateUrl: "./squirrels.component.html",
	styleUrls: ["./squirrels.component.scss"],
})
export class SquirrelsComponent implements OnInit, OnDestroy {
	bigger = false;

	@ViewChild("iframe", { static: true })
	iframe: ElementRef<HTMLIFrameElement>;

	constructor() {}

	onMessage = (message: MessageEvent<any>) => {
		if (message.data == "squirrels-keydown-escape") {
			if (this.bigger == true) this.bigger = false;
		}
	};

	ngOnInit() {
		window.addEventListener("message", this.onMessage);
	}

	ngOnDestroy() {
		window.removeEventListener("message", this.onMessage);
	}

	toggleBigger() {
		this.bigger = !this.bigger;
	}

	@HostListener("window:keydown.escape", ["$event"])
	onKeydown(event: KeyboardEvent) {
		if (this.bigger == true) this.bigger = false;
	}
}
