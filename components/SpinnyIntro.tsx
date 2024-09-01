import { BoxProps, Flex, Text } from "@chakra-ui/react";
import { Component, createRef } from "react";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ClientInfo } from "../server/main";
import { Easing } from "../utils/easing-functions";
import { TweenManager } from "../utils/tween-manager";
import { glslMod, invLerp, sleep } from "../utils/utils";
import { ISpinnyIntro } from "./spinny-intros";
import HomeCardLoading from "./ui/home-card/HomeCardLoading";

const Deg2Rad = 0.0174533;

const startDegrees = 180 / 360; // deg

const endDegrees = -30 / 360; // deg
const endDegreesIfNoSpin = -45 / 360; // deg

const startScale = 0.5;
const endScale = 1;

// const frameSize = 512;

// > 1000 frames, so play at 1000 fps to make it one second long

// ffmpeg -framerate 1000 -pattern_type glob -i "intro-pony-frames/*.png" \
// -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p \
// intro-pony-frames.mp4

// > lowering resolution helps a lot on mobile
// > -vf scale=512:512

// > also lowering crf on mobile which will increase filesize
// > but is okay because lowering res will decrease it a lot

// ffmpeg -y -framerate 1000 -pattern_type glob -i "intro-pony-frames/*.png" \
// -c:v libvpx-vp9 -row-mt 1 -pix_fmt yuva420p \
// -b:v 0 -crf 52 -g 1 \
// intro-pony-frames-1000x800.webm

// ffmpeg -y -framerate 1000 -pattern_type glob -i "intro-pony-frames/*.png" \
// -c:v libvpx-vp9 -row-mt 1 -pix_fmt yuva420p -vf scale=384:384 \
// -b:v 0 -crf 42 -g 1 \
// intro-pony-frames-500x400.webm

// > i originally converted the frames to webps and tar'd them
// > its inefficient and we gotta downscale quite a bit, not recommended

// parallel -eta cwebp -q 90 -resize 512 512 {} -o {.}.webp ::: *.png
// tar -cvf ../intro-pony-frames.tar *.webp

// > aah it never ends. im constantly tweaking this
// > find make-video.sh in components/assets

function isElementInFrame(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	const w = window.innerWidth || document.documentElement.clientWidth;
	const h = window.innerHeight || document.documentElement.clientHeight;
	return rect.top < h && rect.bottom > 0 && rect.left < w && rect.right > 0;
}

type SpinnyIntroProps = BoxProps & {
	onReady?: () => any;
	onUnready?: () => any;
	client: ClientInfo;
	intro: ISpinnyIntro;
	disableScaleTween?: boolean;
	disableAutoSpin?: boolean;
};

export default class SpinnyIntro extends Component<SpinnyIntroProps> {
	state = {
		loadingOpacity: 1,
		unsupportedOpacity: 0,
		opacity: 0,
		progress: 0,
	};

	parentRef = createRef<HTMLDivElement>();
	videoRef = createRef<HTMLVideoElement>();

	onMouseDown = () => {
		if (this.parentRef.current == null) return;
		this.parentRef.current.style.cursor = "grabbing";
	};

	onMouseUp = () => {
		if (this.parentRef.current == null) return;
		this.parentRef.current.style.cursor = "grab";
	};

	tweenMangager = new TweenManager();

	updating = false;

	async getVideo(signal?: AbortSignal) {
		// get video loading progress

		if (this.props.client.isSafari) {
			// TODO: safari is awful. transparency doesnt work either and cant scrub
			this.videoRef.current.src = this.props.client.isMobile
				? this.props.intro.mobile
				: this.props.intro.desktop;
		} else {
			const res = await fetch(
				this.props.client.isMobile
					? this.props.intro.mobile
					: this.props.intro.desktop,
				{
					cache: "force-cache",
					signal,
				},
			);

			if (res.body == null) return;

			const reader = res.body.getReader();

			const contentLength = Number(
				res.headers.get("Content-Length") ?? 0,
			);
			if (contentLength == null) return;

			let receivedLength = 0;
			let chunks: Uint8Array[] = [];

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				chunks.push(value);
				receivedLength += value.length;

				this.setState({
					progress: (receivedLength / contentLength) * 100,
				});
			}

			const blob = new Blob(chunks);

			var vid = URL.createObjectURL(blob);
			this.videoRef.current.src = vid;
		}
	}

	async componentDidMount() {
		await this.getVideo();

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

		const onClickForPlayPaused = (e: Event) => {
			if (hasPlayPaused) return;
			if (this.videoRef.current) {
				this.videoRef.current.play;
				this.videoRef.current.pause();
			}
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

		let tweenRotation = 0;

		const rotationTweener = this.tweenMangager.newTweener((deg: number) => {
			tweenRotation = deg;
		}, startDegrees);

		const scaleTweener = this.tweenMangager.newTweener(
			(s: number) => {
				this.videoRef.current.style.transform = `scale(${s})`;
			},
			this.props.disableScaleTween ? endScale : startScale,
		);

		// init fake 3d camera for angle

		const camera = new PerspectiveCamera(1, 1, 10, 1000);
		camera.position.set(0, 0, -75);

		const controls = new OrbitControls(camera, this.parentRef.current);
		controls.enableZoom = false;
		controls.enablePan = false;
		controls.autoRotate = this.props.disableAutoSpin ? false : true;
		controls.autoRotateSpeed = -1;
		controls.enableDamping = true;

		const polarAngle = 72 * Deg2Rad;
		controls.minPolarAngle = polarAngle;
		controls.maxPolarAngle = polarAngle;

		controls.update();

		// update cursor

		this.parentRef.current.style.cursor = "grab";

		parent.addEventListener("mousedown", this.onMouseDown);
		parent.addEventListener("mouseup", this.onMouseUp);

		const update = () => {
			if (this.parentRef.current == null || controls == null) return;
			controls.update();
			this.tweenMangager.update();

			// update frames

			if (this.videoRef.current == null) return;
			if (!isElementInFrame(this.videoRef.current)) return;
			if (
				Number.isNaN(this.videoRef.current.duration) ||
				this.videoRef.current.duration == 0
			) {
				return;
			}

			// if (ctx == null) return;

			const azimuthalAngle = controls.getAzimuthalAngle();
			const rotation = glslMod(
				invLerp(-Math.PI, Math.PI, azimuthalAngle) - tweenRotation,
				1,
			);

			// const frame = frames[Math.floor(rotation * frames.length)];

			// ctx.clearRect(0, 0, size, size);
			// ctx.drawImage(frame, 0, 0, frameSize, frameSize, 0, 0, size, size);'

			this.videoRef.current.currentTime =
				rotation * this.videoRef.current.duration;
		};

		const updateLoop = () => {
			if (!this.updating) return;
			update();
			requestAnimationFrame(updateLoop);
		};

		// do stuff!

		this.updating = true;
		requestAnimationFrame(updateLoop);

		await sleep(100);

		this.setState({ loadingOpacity: 0 });

		await sleep(100);

		this.setState({ opacity: 1 });

		rotationTweener.tween(
			this.props.disableAutoSpin ? endDegreesIfNoSpin : endDegrees,
			2500,
			Easing.OutExpo,
		);
		scaleTweener.tween(endScale, 2500, Easing.OutExpo);

		if (this.props.onReady) this.props.onReady();

		await sleep(100);

		this.setState({ unsupportedOpacity: 1 });
	}

	componentWillUnmount() {
		// console.log("cleanup");
		this.updating = false;
		parent.removeEventListener("mousedown", this.onMouseDown);
		parent.removeEventListener("mouseup", this.onMouseUp);
		this.tweenMangager.removeAllTweeners();
	}

	async componentDidUpdate(prevProps: SpinnyIntroProps, prevState: any) {
		if (this.props.intro !== prevProps.intro) {
			// this.componentWillUnmount();
			// this.componentDidMount();

			if (this.props.onUnready) this.props.onUnready();

			this.setState({
				progress: 0,
				loadingOpacity: 1,
				opacity: 0.2,
				unsupportedOpacity: 0,
			});

			// abortController = new AbortController();
			await this.getVideo();

			this.setState({
				loadingOpacity: 0,
				opacity: 1,
				unsupportedOpacity: 1,
			});

			if (this.props.onReady) this.props.onReady();
		}
	}

	render() {
		const {
			onReady,
			onUnready,
			client,
			intro,
			disableScaleTween,
			disableAutoSpin,
			...flexProps
		} = this.props;

		const size = (flexProps.h ?? flexProps.height ?? 0) as number;

		return (
			<Flex
				w={size + "px"}
				minW={size + "px"}
				h={size + "px"}
				{...flexProps}
				position={"relative"}
				ref={this.parentRef}
				alignItems={"center"}
				justifyContent={"center"}
				// pointerEvents={"none"}
				userSelect={"none"}
			>
				<Flex
					position={"absolute"}
					w={"100%"}
					h={"60%"}
					left={0}
					bottom={0}
					alignItems={"center"}
					justifyContent={"center"}
					transition={"opacity 0.1s linear"}
					opacity={this.state.unsupportedOpacity}
					// zIndex={10}
				>
					<Text
						fontSize={"large"}
						fontWeight={600}
						opacity={0.3}
						textAlign={"center"}
						lineHeight={"1.3em"}
					>
						there's supposed to be a cute
						<br />
						3d model here but unfortunately
						<br />
						your browser doesn't support it :(
					</Text>
				</Flex>
				<video
					ref={this.videoRef}
					style={{
						position: "absolute",
						transition: "opacity 0.1s linear",
						// zIndex: 20,
						// opacity: 0.1,
						opacity: this.state.opacity,
						width: "100%",
						height: "100%",
						pointerEvents: "none",
						userSelect: "none",
						transformOrigin: "50% 70%",
					}}
					playsInline={true}
					preload={"auto"}
					muted={true}
				>
					{/* <source
						src={isMobile ? ponyMobile : ponyDesktop}
						type="video/webm"
					></source> */}
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
					opacity={this.state.loadingOpacity}
					// zIndex={30}
				>
					<HomeCardLoading size={16} progress={this.state.progress} />
				</Flex>
			</Flex>
		);
	}
}
