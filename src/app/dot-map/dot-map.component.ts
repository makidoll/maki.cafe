import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
	selector: "app-dot-map",
	templateUrl: "./dot-map.component.html",
	styleUrls: ["./dot-map.component.scss"],
})
export class DotMapComponent implements OnInit {
	// dots: boolean[][] = [];

	@ViewChild("canvas", { static: true })
	canvas: ElementRef<HTMLCanvasElement>;

	scale = 6;
	width = 16 * this.scale;
	height = 9 * this.scale;

	constructor() {}

	getImage(url: string) {
		return new Promise<HTMLImageElement>((resolve, reject) => {
			const img = document.createElement("img");
			img.addEventListener("load", () => {
				resolve(img);
			});
			img.addEventListener("error", error => {
				reject(error);
			});
			img.src = url;
		});
	}

	async getCanvasForWorldMap() {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		const ctx = canvas.getContext("2d");

		const image = await this.getImage("/assets/dot-map/world-map.svg");
		ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

		return { canvas, ctx };
	}

	materialLightBlue100 = [179, 229, 252, 255]; // #b3e5fc
	materialLightGreen400Dimmed = [156, 204, 101, 255 * 0.8]; // #9ccc65

	createPixelImageData(ctx: CanvasRenderingContext2D, land = false) {
		const imageData = ctx.createImageData(2, 2);
		let color = land
			? this.materialLightGreen400Dimmed
			: this.materialLightBlue100;
		for (let i = 0; i < 16; i += 4) {
			imageData.data[i + 0] = color[0];
			imageData.data[i + 1] = color[1];
			imageData.data[i + 2] = color[2];
			imageData.data[i + 3] = color[3];
		}
		return imageData;
	}

	async ngOnInit() {
		const canvas = this.canvas.nativeElement;
		// each dot is 2 px with 1 px space
		// dont add extra space at the end
		canvas.width = this.width * 3 - 1;
		canvas.height = this.height * 3 - 1;

		const ctx = canvas.getContext("2d");

		const { ctx: worldMapCtx } = await this.getCanvasForWorldMap();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const pixel = worldMapCtx.getImageData(x, y, 1, 1);
				ctx.putImageData(
					this.createPixelImageData(ctx, pixel.data[3] > 128),
					x * 3,
					y * 3,
				);
			}
		}
	}
}
