import { BoxProps, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Easing } from "../utils/easing-functions";
import { TweenManager } from "../utils/tween-manager";
import HomeCardLoading from "./ui/home-card/HomeCardLoading";
import introDroneFrames from "./assets/intro-drone-frames.webm";

const Deg2Rad = 0.0174533;

const startDegrees = 180 / 360; // deg
const endDegrees = -60 / 360; // deg

const startScale = 0.5;
const endScale = 1;

// 1024 frames, so play at 1024 fps to make it one second long

// ffmpeg -framerate 1024 -pattern_type glob -i "intro-drone-frames/*.png" \
// -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p \
// intro-drone-frames.mp4

// ffmpeg -framerate 1024 -pattern_type glob -i "intro-drone-frames/*.png" \
// -movflags faststart -c:v libvpx-vp9 -b:v 0 -crf 52 -g 1 -pix_fmt yuva420p  \
// intro-drone-frames.webm

function isElementInFrame(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	const w = window.innerWidth || document.documentElement.clientWidth;
	const h = window.innerHeight || document.documentElement.clientHeight;
	return rect.top < h && rect.bottom > 0 && rect.left < w && rect.right > 0;
}

function glslMod(a, n) {
	return (a + n) % n;
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
enum VideoReadyState {
	HAVE_NOTHING = 0,
	HAVE_METADATA = 1,
	HAVE_CURRENT_DATA = 2,
	HAVE_FUTURE_DATA = 3,
	HAVE_ENOUGH_DATA = 4,
}

export default function IntroDrone(props: BoxProps & { onLoaded: () => any }) {
	const [loadingOpacity, setLoadingOpacity] = useState(1);
	const [opacity, setOpacity] = useState(0);

	const parentRef = useRef<HTMLDivElement>();
	const videoRef = useRef<HTMLVideoElement>();

	const { onLoaded: _, ...flexProps } = props;

	const init = async (parent: HTMLDivElement, video: HTMLVideoElement) => {
		// wait until video is loaded (well kinda but idk)

		if (video.readyState != VideoReadyState.HAVE_ENOUGH_DATA) {
			console.log("waiting for done");
			await new Promise(resolve => {
				let interval = setInterval(() => {
					if (video.readyState != VideoReadyState.HAVE_ENOUGH_DATA)
						return;
					clearInterval(interval);
					resolve(null);
				}, 100);
			});
			console.log("done");
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

		const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));

		const invLerp = (x, y, a) => clamp((a - x) / (y - x));

		let rotation = 0;

		const update = () => {
			if (parent == null) return;

			controls.update();
			tweenMangager.update();

			// update frames

			if (video == null) return;

			if (!isElementInFrame(video)) return;

			const azimuthalAngle = controls.getAzimuthalAngle();
			rotation = glslMod(
				invLerp(-Math.PI, Math.PI, azimuthalAngle) -
					tweenValues.rotation,
				1,
			);

			video.currentTime = rotation;
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
					props.onLoaded();
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
					width: (props.h ?? props.height ?? 0) + "px",
					height: (props.h ?? props.height ?? 0) + "px",
					pointerEvents: "none",
					userSelect: "none",
				}}
				playsInline={true}
				preload={"auto"}
				muted={true}
			>
				<source src={introDroneFrames} type="video/webm"></source>
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
