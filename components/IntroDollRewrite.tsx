import { Box, BoxProps, Flex, useLatestRef } from "@chakra-ui/react";
import {
	EffectCallback,
	useState,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import {
	ACESFilmicToneMapping,
	CineonToneMapping,
	DataTexture,
	DoubleSide,
	EquirectangularReflectionMapping,
	Group,
	LinearFilter,
	LinearToneMapping,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	NoToneMapping,
	PerspectiveCamera,
	RectAreaLight,
	ReinhardToneMapping,
	SRGBColorSpace,
	Scene,
	Texture,
	TextureLoader,
	WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { TweenManager } from "../utils/tween-manager";
import { Easing } from "../utils/easing-functions";
import HomeCardLoading from "./ui/home-card/HomeCardLoading";

const Deg2Rad = 0.0174533;

const startDegrees = 180 * Deg2Rad;
const endDegrees = -30 * Deg2Rad;

const startScale = 0.5;
const endScale = 1;

async function loadTexture(path: string) {
	return new Promise<Texture>((resolve, reject) => {
		new TextureLoader().load(path, resolve, undefined, reject);
	});
}

async function loadHdr(path: string) {
	return new Promise<DataTexture>((resolve, reject) => {
		new RGBELoader().load(path, resolve, undefined, reject);
	});
}

function rectAreaLightHelper(light: RectAreaLight) {
	const helper = new RectAreaLightHelper(light);
	light.add(helper);
}

async function getDollModel(): Promise<Group> {
	const loader = new GLTFLoader();

	const draco = new DRACOLoader();
	// draco.setDecoderConfig({ type: "js" });
	draco.setDecoderPath("/_next/static/libs/draco/");

	loader.setDRACOLoader(draco);

	const gltf = await new Promise<GLTF>((resolve, reject) => {
		loader.load("baked-doll/baked.glb", resolve, undefined, reject);
	});

	enum TextureName {
		rest_baked = "rest_baked.webp",
		rest_baked_alpha = "rest_baked_alpha.webp",
		bastion_baked = "bastion_baked.webp",
		keyboardgomez_baked = "keyboardgomez_baked.webp",
		mercyhair_baked = "mercyhair_baked.webp",
		eyesdoll = "eyesdoll.webp",
		doll_diffuse = "doll_diffuse.webp",
		doll_roughness = "doll_roughness.webp",
	}

	const texturesLoaded: Texture[] = await Promise.all(
		Object.values(TextureName).map(async filename => {
			const texture = await loadTexture("baked-doll/" + filename);
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.generateMipmaps = true;
			texture.colorSpace = "srgb";
			return texture;
		}),
	);

	const textures: { TextureName: Texture } = Object.values(
		TextureName,
	).reduce(
		(object, key, i) => ({ ...object, [key]: texturesLoaded[i] }),
		{},
	) as any;

	// set all unlit materials

	const unlitTextures: { name: string; map: Texture; alphaMap?: Texture }[] =
		[
			{
				name: "Rest_Baked",
				map: textures[TextureName.rest_baked],
				alphaMap: textures[TextureName.rest_baked_alpha],
			},
			{
				name: "Bastion_Baked",
				map: textures[TextureName.bastion_baked],
			},
			{
				name: "KeyboardGomez_Baked",
				map: textures[TextureName.keyboardgomez_baked],
			},
			{
				name: "MercyHair_Baked",
				map: textures[TextureName.mercyhair_baked],
			},
			{
				name: "EyesDoll_Baked",
				map: textures[TextureName.eyesdoll],
			},
		];

	for (const { name, map, alphaMap } of unlitTextures) {
		const mesh = gltf.scene.children.find(o => o.name == name) as Mesh;
		if (mesh == null) {
			console.error("Failed to find mesh: " + name);
			continue;
		}

		try {
			const material = new MeshBasicMaterial({
				side: DoubleSide,
			});

			material.map = map;

			if (alphaMap) {
				material.alphaMap = alphaMap;
				material.alphaTest = 0.5;
			}

			mesh.material = material;
		} catch (error) {
			console.error("Failed to get textures for: " + name);
		}
	}

	// set doll mesh material

	const dollMesh = gltf.scene.children.find(
		o => o.name == "Doll_Baked",
	) as Mesh;

	dollMesh.material = new MeshStandardMaterial({
		map: textures[TextureName.doll_diffuse],
		roughnessMap: textures[TextureName.doll_roughness],
	});

	// add lights

	const scene = gltf.scene;

	const blueLight = new RectAreaLight("#00C6FF", 30, 0.3, 0.8);
	blueLight.position.set(-0.829314, 0.380562, 1.16075);
	blueLight.rotation.set(0, -28.3484 * Deg2Rad, 0);
	scene.add(blueLight);

	const orangeLight = new RectAreaLight("#FF9100", 30, 0.3, 0.8);
	orangeLight.position.set(0.829314, 0.380562, 1.16075);
	orangeLight.rotation.set(0, 28.3484 * Deg2Rad, 0);
	scene.add(orangeLight);

	const screenLight = new RectAreaLight("#373A4A", 30, 0.719457, 0.402013);
	screenLight.position.set(0, 0.339337, 0.516989);
	screenLight.rotation.set(0, 0, 0);
	scene.add(screenLight);

	// rectAreaLightHelper(blueLight);
	// rectAreaLightHelper(orangeLight);
	// rectAreaLightHelper(screenLight);

	return scene;
}

export default function IntroDollRewrite(
	props: BoxProps & { onLoaded: () => any },
) {
	const [loadingOpacity, setLoadingOpacity] = useState(1);
	const [opacity, setOpacity] = useState(0);

	const parentRef = useRef<HTMLDivElement>();
	const canvasRef = useRef<HTMLCanvasElement>();

	const init = async (parent: HTMLDivElement, canvas: HTMLCanvasElement) => {
		if (parent == null || canvas == null) return;

		let currentWidth = parent.clientWidth;
		let currentHeight = parent.clientHeight;

		const tweenMangager = new TweenManager();

		// set up scene

		RectAreaLightUniformsLib.init();

		const scene = new Scene();
		scene.background = null; // transparent

		const hdr = await loadHdr("baked-doll/environment.hdr");
		hdr.mapping = EquirectangularReflectionMapping;
		scene.environment = hdr;

		const dollModel = await getDollModel();
		dollModel.position.set(0, -0.41, 0);

		const dollRotationTweener = tweenMangager.newTweener(y => {
			dollModel.rotation.set(0, y, 0);
		}, startDegrees);

		const dollScaleTweener = tweenMangager.newTweener(s => {
			dollModel.scale.set(s, s, s);
		}, startScale);

		scene.add(dollModel);

		// set up controls

		const camera = new PerspectiveCamera(
			1,
			currentWidth / currentHeight,
			10,
			1000,
		);

		// const camera = new OrthographicCamera();

		camera.position.set(0, 0, 75);

		// set up controls

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

		// set up renderer

		const renderer = new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
		});

		renderer.toneMapping = LinearToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
		renderer.setSize(currentWidth, currentHeight);
		renderer.setPixelRatio(window.devicePixelRatio);

		const update = () => {
			if (parent == null) return;

			// update controls

			controls.update();

			// update size if changed

			let sizeChanged = false;

			if (currentWidth != parent.clientWidth) {
				sizeChanged = true;
				currentWidth = parent.clientWidth;
			}

			if (currentHeight != parent.clientHeight) {
				sizeChanged = true;
				currentHeight = parent.clientHeight;
			}

			if (sizeChanged) {
				camera.aspect = currentWidth / currentHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(currentWidth, currentHeight);
			}

			// update pixel ratio if changed

			if (renderer.pixelRatio != window.devicePixelRatio) {
				renderer.setPixelRatio(window.devicePixelRatio);
			}

			// update tweeners
			tweenMangager.update();

			// render

			renderer.render(scene, camera);
		};

		update();

		// console.log("init done");

		const cleanup = () => {
			// console.log("cleanup");
			tweenMangager.removeAllTweeners();
		};

		const afterInit = () => {
			// console.log("after init");
			dollRotationTweener.tween(endDegrees, 2500, Easing.OutExpo);
			dollScaleTweener.tween(endScale, 2500, Easing.OutExpo);
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
		<Box
			w={"100%"}
			h={256}
			{...props}
			position={"relative"}
			ref={ref => {
				if (ref) parentRef.current = ref;
			}}
		>
			<canvas
				width="100%"
				height="100%"
				ref={ref => {
					if (ref) canvasRef.current = ref;
				}}
				style={{
					transition: "opacity 0.1s linear",
					zIndex: 20,
					opacity,
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
		</Box>
	);
}
