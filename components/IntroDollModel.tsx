import { a, SpringValue } from "@react-spring/three";
import { Environment, useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { Color, DoubleSide, LinearFilter, Mesh, Vector3 } from "three";

const path = "/baked-doll/";
const glbPath = path + "baked.glb";

const Deg2Rad = 0.0174533;

export default function IntroDollModel(props: {
	position: Vector3;
	rotationY: SpringValue<number>;
	scale: SpringValue<number>;
	endScale: number;
	onLoaded?: () => any;
}) {
	const { scene } = useGLTF(glbPath);

	// const rectAreaLightA = useRef<any>();
	// const rectAreaLightB = useRef<any>();
	// const rectAreaLightC = useRef<any>();
	// useHelper(rectAreaLightA, RectAreaLightHelper);
	// useHelper(rectAreaLightB, RectAreaLightHelper);
	// useHelper(rectAreaLightC, RectAreaLightHelper);

	const getMesh = (name: string) =>
		scene.children.find(o => o.name == name) as Mesh;

	// meshes
	const mBastion = getMesh("Bastion_Baked");
	const mKeyboardGomez = getMesh("KeyboardGomez_Baked");
	const mRest = getMesh("Rest_Baked");
	const mMercyHair = getMesh("MercyHair_Baked");
	const mEyesDoll = getMesh("EyesDoll_Baked");
	const mDoll = getMesh("Doll_Baked");

	// textures
	const tBastion = useTexture(path + "bastion_baked.webp");
	const tKeyboardGomez = useTexture(path + "keyboardgomez_baked.webp");
	const tRest = useTexture(path + "rest_baked.webp");
	const tRestAlpha = useTexture(path + "rest_baked_alpha.webp");
	const tMercyHair = useTexture(path + "mercyhair_baked.webp");
	const tEyesDoll = useTexture(path + "eyesdoll.webp");
	const tDollDiffuse = useTexture(path + "doll_diffuse.webp");
	const tDollRoughness = useTexture(path + "doll_roughness.webp");

	for (const map of [
		tBastion,
		tKeyboardGomez,
		tRest,
		tRestAlpha,
		tMercyHair,
		tEyesDoll,
		tDollDiffuse,
		tDollRoughness,
	]) {
		// map.anisotropy = 4;
		map.magFilter = LinearFilter;
		map.minFilter = LinearFilter;
		map.generateMipmaps = true;
	}

	useEffect(() => {
		if (props.onLoaded) props.onLoaded();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<a.group
			position={props.position}
			scale={props.scale}
			rotation-y={props.rotationY}
		>
			<a.mesh geometry={mBastion?.geometry}>
				<meshBasicMaterial map={tBastion} side={DoubleSide} />
			</a.mesh>
			<a.mesh geometry={mKeyboardGomez?.geometry}>
				<meshBasicMaterial map={tKeyboardGomez} side={DoubleSide} />
			</a.mesh>
			<a.mesh geometry={mRest?.geometry}>
				<meshBasicMaterial
					map={tRest}
					side={DoubleSide}
					alphaMap={tRestAlpha}
					alphaTest={0.5}
				/>
			</a.mesh>
			<a.mesh geometry={mMercyHair?.geometry}>
				<meshBasicMaterial map={tMercyHair} side={DoubleSide} />
			</a.mesh>
			<a.mesh geometry={mEyesDoll?.geometry}>
				<meshBasicMaterial map={tEyesDoll} side={DoubleSide} />
			</a.mesh>
			<a.mesh geometry={mDoll?.geometry}>
				<meshPhysicalMaterial
					// color="black"
					map={tDollDiffuse}
					roughnessMap={tDollRoughness}
					// roughness={0.5}
				/>
			</a.mesh>
			<Environment
				// files="https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/hdris/noon-grass/noon_grass_1k.hdr"
				files={path + "environment.hdr"}
				// background
			/>
			{/* <ambientLight intensity={0.05} color={"#fff"} /> */}
			<a.rectAreaLight
				// ref={rectAreaLightA}
				color={new Color("#00C6FF")}
				intensity={30}
				position={new Vector3(-0.829314, 0.380562, 1.16075)}
				rotation={[0, -28.3484 * Deg2Rad, 0]}
				width={0.3 * props.endScale}
				height={0.8 * props.endScale}
			></a.rectAreaLight>
			<a.rectAreaLight
				// ref={rectAreaLightB}
				color={new Color("#FF9100")}
				intensity={30}
				position={new Vector3(0.829314, 0.380562, 1.16075)}
				rotation={[0, 28.3484 * Deg2Rad, 0]}
				width={0.3 * props.endScale}
				height={0.8 * props.endScale}
			></a.rectAreaLight>
			<a.rectAreaLight
				// ref={rectAreaLightC}
				color={new Color("#373A4A")}
				intensity={30}
				position={new Vector3(0, 0.339337, 0.516989)}
				rotation={[0, 0, 0]}
				width={0.719457 * props.endScale}
				height={0.402013 * props.endScale}
			></a.rectAreaLight>
		</a.group>
	);
}

useGLTF.preload(glbPath);
