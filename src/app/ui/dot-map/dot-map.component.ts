import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-dot-map",
	templateUrl: "./dot-map.component.html",
	styleUrls: ["./dot-map.component.scss"],
})
export class DotMapComponent implements OnInit {
	// dots: boolean[][] = [];

	// @ViewChild("canvas", { static: true })
	// canvas: ElementRef<HTMLCanvasElement>;

	finalRender = "";

	scale = 6;
	width = 16 * this.scale;
	height = 9 * this.scale;

	pins = [
		[47.5, 37], // belgium
		[43.5, 46], // tenerife
		// [12.5, 49], // california
		[20.5, 49], // houston
	];

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

	createCanvas(width: number, height: number) {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		return { canvas, ctx };
	}

	async getCanvasForWorldMap() {
		const { canvas, ctx } = this.createCanvas(this.width, this.height);

		const image = await this.getImage(
			"data:image/svg+xml;utf8," + require("./world-map.svg").default,
		);
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

	isCorner(x: number, y: number, w: number, h: number) {
		const cornerSize = 4;

		// dont run all this code if its not necessary
		if (x > cornerSize && x < w - cornerSize) return false;
		if (y > cornerSize && y < h - cornerSize) return false;

		let isCorner = false;

		const check = (cornerCoords: number[][]) => {
			for (const coords of cornerCoords) {
				if (x == coords[0] && y == coords[1]) {
					isCorner = true;
					break;
				}
			}
		};

		const topLeftCoords = [
			[0, 0],
			[1, 0],
			[2, 0],
			[3, 0],
			[0, 1],
			[1, 1],
			[0, 2],
			[0, 3],
		];
		check(topLeftCoords);
		if (isCorner) return isCorner;

		const topRightCoords = topLeftCoords.map(([x, y]) => [
			w - cornerSize - 1 + cornerSize - x,
			y,
		]);
		check(topRightCoords);
		if (isCorner) return isCorner;

		const bottomLeftCoords = topLeftCoords.map(([x, y]) => [
			x,
			h - cornerSize - 1 + cornerSize - y,
		]);
		check(bottomLeftCoords);
		if (isCorner) return isCorner;

		const bottomRightCoords = topLeftCoords.map(([x, y]) => [
			w - cornerSize - 1 + cornerSize - x,
			h - cornerSize - 1 + cornerSize - y,
		]);
		check(bottomRightCoords);
		return isCorner;
	}

	async generateImage() {
		// each dot is 2 px with 1 px space
		// dont add extra space at the end
		const { canvas, ctx } = this.createCanvas(
			this.width * 3 - 1,
			this.height * 3 - 1,
		);

		const { ctx: worldMapCtx } = await this.getCanvasForWorldMap();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				if (this.isCorner(x, y, this.width, this.height)) continue;

				const pixel = worldMapCtx.getImageData(x, y, 1, 1);
				ctx.putImageData(
					this.createPixelImageData(ctx, pixel.data[3] > 128),
					x * 3,
					y * 3,
				);
			}
		}

		return canvas.toDataURL("image/png");
	}

	async ngOnInit() {
		// this.finalRender = await this.generateImage();
		// one less image load haha
		this.finalRender =
			"data:image/png;base64,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";
	}
}
