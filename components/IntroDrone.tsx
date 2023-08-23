import { BoxProps, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Easing } from "../utils/easing-functions";
import { TweenManager } from "../utils/tween-manager";
import HomeCardLoading from "./ui/home-card/HomeCardLoading";

const Deg2Rad = 0.0174533;

const frameWidth = 1024;
const frameHeight = 1024;

const startDegrees = 180 / 360; // deg
const endDegrees = -60 / 360; // deg

const startScale = 0.5;
const endScale = 1;

export default function IntroDrone(props: BoxProps & { onLoaded: () => any }) {
	const [loadingOpacity, setLoadingOpacity] = useState(1);
	const [opacity, setOpacity] = useState(0);

	const parentRef = useRef<HTMLDivElement>();
	const canvasRef = useRef<HTMLCanvasElement>();

	const init = async (parent: HTMLDivElement, canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext("2d");
		if (ctx == null) return;

		canvas.width = frameWidth;
		canvas.height = frameHeight;

		const tweenMangager = new TweenManager();

		const tweenValues = {
			rotation: startDegrees,
			scale: startScale,
		};

		const rotationTweener = tweenMangager.newTweener(y => {
			tweenValues.rotation = y;
		}, startDegrees);

		const scaleTweener = tweenMangager.newTweener(s => {
			tweenValues.scale = s;
		}, startScale);

		const framesRes = await axios("/intro-drone-frames.tar", {
			responseType: "arraybuffer",
		});

		// ssr doesn't like js-untar
		const untar = (await import("js-untar")).default;

		const tarFrames = (await untar(framesRes.data)).filter(
			f => f.type == "0", // files only
		);

		const totalFrames = tarFrames.length;

		const frames = tarFrames.map(file => {
			const img = new Image();
			img.src = file.getBlobUrl();
			return img;
		});

		function glslMod(a, n) {
			return (a + n) % n;
		}

		const camera = new PerspectiveCamera(1, 1, 10, 1000);
		camera.position.set(0, 0, -75);

		const controls = new OrbitControls(camera, parent);
		controls.enableZoom = false;
		controls.enablePan = false;
		controls.autoRotate = true;
		controls.autoRotateSpeed = -1;
		controls.enableDamping = true;

		const polarAngle = 72 * Deg2Rad;
		controls.minPolarAngle = polarAngle;
		controls.maxPolarAngle = polarAngle;

		controls.update();

		const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

		const invLerp = (x, y, a) => clamp((a - x) / (y - x));

		let rotation = 0;

		const update = () => {
			if (parent == null) return;

			// update controls

			controls.update();

			const azimuthalAngle = controls.getAzimuthalAngle();
			rotation = glslMod(
				invLerp(-Math.PI, Math.PI, azimuthalAngle) -
					tweenValues.rotation,
				1,
			);

			// update tweens

			tweenMangager.update();

			// update frame

			if (canvas == null) return;

			try {
				const nFrame = rotation * totalFrames;

				const nFrameFloor = glslMod(Math.floor(nFrame), totalFrames);
				const nFrameCeil = glslMod(Math.ceil(nFrame), totalFrames);

				const nValue = glslMod(nFrame, 1);

				const x = canvas.width * ((1 - tweenValues.scale) / 2);
				const y = canvas.height * ((1 - tweenValues.scale) / 2);
				const sx = canvas.width * tweenValues.scale;
				const sy = canvas.height * tweenValues.scale;

				// ctx.clearRect(0, 0, frameWidth, frameHeight);

				// ctx.globalAlpha = 1 - Math.pow(n, 16);

				ctx.globalAlpha = 1;

				ctx.drawImage(frames[nFrameFloor], x, y, sx, sy);

				ctx.globalAlpha = nValue;

				ctx.drawImage(frames[nFrameCeil], x, y, sx, sy);
			} catch (error) {}
		};

		const cleanup = () => {
			// console.log("cleanup");
			tweenMangager.removeAllTweeners();
		};

		const afterInit = () => {
			rotationTweener.tween(endDegrees, 2500, Easing.OutExpo);
			scaleTweener.tween(endScale, 2500, Easing.OutExpo);
		};

		return { update, cleanup, afterInit };
	};

	useEffect(() => {
		if (parentRef.current == null || canvasRef.current == null) return;

		let cleanup = () => {};

		let updating = true;

		(async () => {
			if (parentRef.current == null || canvasRef.current == null) {
				return;
			}

			const newFunctions = await init(
				parentRef.current,
				canvasRef.current,
			);

			if (newFunctions == null) return;

			cleanup = newFunctions.cleanup;

			const update = () => {
				if (!updating) return;
				newFunctions.update();
				requestAnimationFrame(update);
			};

			requestAnimationFrame(update);

			setTimeout(() => {
				setLoadingOpacity(0);
				setTimeout(() => {
					setOpacity(1);
					newFunctions.afterInit();
					props.onLoaded();
				}, 100);
			}, 100);
		})();

		return () => {
			updating = false;
			cleanup();
		};
	}, [parentRef, canvasRef]);

	return (
		<Flex
			w={"100%"}
			h={256}
			{...props}
			position={"relative"}
			ref={ref => {
				if (ref) parentRef.current = ref;
			}}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<canvas
				ref={ref => {
					if (ref) canvasRef.current = ref;
				}}
				style={{
					transition: "opacity 0.1s linear",
					zIndex: 20,
					opacity,
					width: (props.h ?? props.height ?? 0) + "px",
					height: (props.h ?? props.height ?? 0) + "px",
				}}
			></canvas>
			<Flex
				position={"absolute"}
				w={"100%"}
				h={"100%"}
				top={0}
				left={0}
				alignItems={"center"}
				justifyContent={"center"}
				transition={"opacity 0.1s linear"}
				opacity={loadingOpacity}
				zIndex={10}
			>
				<HomeCardLoading />
			</Flex>
		</Flex>
	);
}
