import { BoxProps, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Easing } from "../utils/easing-functions";
import { TweenManager } from "../utils/tween-manager";
import introDroneFrames1024 from "./assets/intro-drone-frames-1024.webm";
import introDroneFrames384 from "./assets/intro-drone-frames-384.webm";
import HomeCardLoading from "./ui/home-card/HomeCardLoading";

const Deg2Rad = 0.0174533;

const startDegrees = 180 / 360; // deg
const endDegrees = -60 / 360; // deg

const startScale = 0.5;
const endScale = 1;

// const frameSize = 512;

// > 1024 frames, so play at 1024 fps to make it one second long

// ffmpeg -framerate 1024 -pattern_type glob -i "intro-drone-frames/*.png" \
// -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p \
// intro-drone-frames.mp4

// > lowering resolution helps a lot on mobile
// > -vf scale=512:512

// > also lowering crf on mobile which will increase filesize
// > but is okay because lowering res will decrease it a lot

// ffmpeg -y -framerate 1024 -pattern_type glob -i "intro-drone-frames/*.png" \
// -c:v libvpx-vp9 -row-mt 1 -pix_fmt yuva420p \
// -b:v 0 -crf 52 -g 1 \
// intro-drone-frames-1024.webm

// ffmpeg -y -framerate 1024 -pattern_type glob -i "intro-drone-frames/*.png" \
// -c:v libvpx-vp9 -row-mt 1 -pix_fmt yuva420p -vf scale=384:384 \
// -b:v 0 -crf 42 -g 1 \
// intro-drone-frames-384.webm

// > i originally converted the frames to webps and tar'd them
// > its inefficient and we gotta downscale quite a bit, not recommended

// parallel -eta cwebp -q 90 -resize 512 512 {} -o {.}.webp ::: *.png
// tar -cvf ../intro-drone-frames.tar *.webp

const glslMod = (a: number, n: number) => (a + n) % n;

const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));

const invLerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));

function isElementInFrame(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	const w = window.innerWidth || document.documentElement.clientWidth;
	const h = window.innerHeight || document.documentElement.clientHeight;
	return rect.top < h && rect.bottom > 0 && rect.left < w && rect.right > 0;
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
enum VideoReadyState {
	HAVE_NOTHING = 0,
	HAVE_METADATA = 1,
	HAVE_CURRENT_DATA = 2,
	HAVE_FUTURE_DATA = 3,
	HAVE_ENOUGH_DATA = 4,
}

export default function IntroDrone(
	props: BoxProps & { onLoaded: () => any; isMobile: boolean },
) {
	const size = (props.h ?? props.height ?? 0) as number;

	const [loadingOpacity, setLoadingOpacity] = useState(1);
	const [opacity, setOpacity] = useState(0);

	const parentRef = useRef<HTMLDivElement>();
	const videoRef = useRef<HTMLVideoElement>();

	const { onLoaded, isMobile, ...flexProps } = props;

	const init = async (parent: HTMLDivElement, video: HTMLVideoElement) => {
		// const ctx = canvas.getContext("2d");
		// if (ctx == null) return;

		// canvas.width = canvas.height = size;

		// const tar = await (await fetch(introDroneFrames)).arrayBuffer();
		// const files = await untar(tar); // npm:isomorphic-untar

		// const limit = pLimit(1024); // npm:p-limit

		// const framePromises = files
		// 	.map(async f => createImageBitmap(new Blob([f.buffer])))
		// 	.map(fn => limit(() => fn));

		// const frames = await Promise.all(framePromises);

		// wait until video is loaded (well kinda but idk)

		if (video.readyState != VideoReadyState.HAVE_ENOUGH_DATA) {
			// console.log("waiting for done");
			await new Promise(resolve => {
				let interval = setInterval(() => {
					if (video.readyState != VideoReadyState.HAVE_ENOUGH_DATA)
						return;
					clearInterval(interval);
					resolve(null);
				}, 100);
			});
			// console.log("done");
		}

		// play and pause when user clicked

		let hasPlayPaused = false;

		const removePlayPausedEventListeners = () => {
			document.documentElement.removeEventListener(
				"touchstart",
				onClickForPlayPaused,
			);
			document.documentElement.removeEventListener(
				"mousedown",
				onClickForPlayPaused,
			);
		};

		const onClickForPlayPaused = e => {
			if (hasPlayPaused) return;
			video.play;
			video.pause();
			hasPlayPaused = true;
			removePlayPausedEventListeners();
		};

		document.documentElement.addEventListener(
			"touchstart",
			onClickForPlayPaused,
		);

		document.documentElement.addEventListener(
			"mousedown",
			onClickForPlayPaused,
		);

		// init tweeners

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

		// init fake 3d camera for angle

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

		// update cursor

		parent.style.cursor = "grab";

		const onMouseDown = () => {
			console.log("mouse down");
			parent.style.cursor = "grabbing";
		};
		const onMouseUp = () => {
			parent.style.cursor = "grab";
		};

		parent.addEventListener("mousedown", onMouseDown);
		parent.addEventListener("mouseup", onMouseUp);

		let rotation = 0;

		const update = () => {
			if (parent == null) return;

			controls.update();
			tweenMangager.update();

			// update frames

			if (video == null) return;
			if (!isElementInFrame(video)) return;

			// if (ctx == null) return;

			const azimuthalAngle = controls.getAzimuthalAngle();
			rotation = glslMod(
				invLerp(-Math.PI, Math.PI, azimuthalAngle) -
					tweenValues.rotation,
				1,
			);

			// const frame = frames[Math.floor(rotation * frames.length)];

			// ctx.clearRect(0, 0, size, size);
			// ctx.drawImage(frame, 0, 0, frameSize, frameSize, 0, 0, size, size);

			video.currentTime = rotation;
		};

		const cleanup = () => {
			// console.log("cleanup");
			parent.removeEventListener("mousedown", onMouseDown);
			parent.removeEventListener("mouseup", onMouseUp);
			tweenMangager.removeAllTweeners();
		};

		const afterInit = () => {
			rotationTweener.tween(endDegrees, 2500, Easing.OutExpo);
			scaleTweener.tween(endScale, 2500, Easing.OutExpo);
		};

		return { update, cleanup, afterInit };
	};

	useEffect(() => {
		// setLoadingOpacity(0);
		// setOpacity(1);
		// props.onLoaded();
		// return;

		if (parentRef.current == null || videoRef.current == null) return;

		let cleanup = () => {};

		let updating = true;

		(async () => {
			if (parentRef.current == null || videoRef.current == null) {
				return;
			}

			const newFunctions = await init(
				parentRef.current,
				videoRef.current,
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
					onLoaded();
				}, 100);
			}, 100);
		})();

		return () => {
			updating = false;
			cleanup();
		};
	}, [parentRef, videoRef]);

	return (
		<Flex
			w={"100%"}
			h={256}
			{...flexProps}
			position={"relative"}
			ref={ref => {
				if (ref) parentRef.current = ref;
			}}
			alignItems={"center"}
			justifyContent={"center"}
			// pointerEvents={"none"}
			userSelect={"none"}
		>
			<video
				ref={ref => {
					if (ref) videoRef.current = ref;
				}}
				style={{
					transition: "opacity 0.1s linear",
					zIndex: 20,
					opacity,
					width: size + "px",
					minWidth: size + "px",
					height: size + "px",
					pointerEvents: "none",
					userSelect: "none",
				}}
				playsInline={true}
				preload={"auto"}
				muted={true}
			>
				<source
					src={isMobile ? introDroneFrames384 : introDroneFrames1024}
					type="video/webm"
				></source>
			</video>
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
