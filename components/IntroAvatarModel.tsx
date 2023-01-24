import { a, SpringValue } from "@react-spring/three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { DoubleSide, LinearFilter, Mesh, Vector3 } from "three";

export default function IntroAvatarModel(props: {
	position?: Vector3;
	rotationY?: SpringValue<number>;
	scale?: SpringValue<number>;
	onLoaded?: () => any;
}) {
	const path = "/intro-avatar/";
	const { nodes } = useGLTF(path + "baked.glb");

	const Bastion_Baked = nodes.Bastion_Baked as Mesh;
	const KeyboardGomez_Baked = nodes.KeyboardGomez_Baked as Mesh;
	const Maki_Baked = nodes.Maki_Baked as Mesh;
	const Rest_Baked = nodes.Rest_Baked as Mesh;

	const Bastion_Baked_Map = useTexture(path + "bastion_baked.webp");
	const KeyboardGomez_Baked_Map = useTexture(
		path + "keyboardgomez_baked.webp",
	);
	const Maki_Baked_Map = useTexture(path + "maki_baked.webp");
	const Rest_Baked_Map = useTexture(path + "rest_baked.webp");
	const Rest_Baked_Alpha_Map = useTexture(path + "rest_baked_alpha.webp");

	for (const map of [
		Bastion_Baked_Map,
		KeyboardGomez_Baked_Map,
		Maki_Baked_Map,
		Rest_Baked_Map,
		Rest_Baked_Alpha_Map,
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
		<>
			<a.mesh
				geometry={Bastion_Baked?.geometry}
				position={props.position}
				rotation-y={props.rotationY}
				scale={props.scale}
			>
				<meshBasicMaterial map={Bastion_Baked_Map} side={DoubleSide} />
			</a.mesh>
			<a.mesh
				geometry={KeyboardGomez_Baked?.geometry}
				position={props.position}
				rotation-y={props.rotationY}
				scale={props.scale}
			>
				<meshBasicMaterial
					map={KeyboardGomez_Baked_Map}
					side={DoubleSide}
				/>
			</a.mesh>
			<a.mesh
				geometry={Maki_Baked?.geometry}
				position={props.position}
				rotation-y={props.rotationY}
				scale={props.scale}
			>
				<meshBasicMaterial map={Maki_Baked_Map} side={DoubleSide} />
			</a.mesh>
			<a.mesh
				geometry={Rest_Baked?.geometry}
				position={props.position}
				rotation-y={props.rotationY}
				scale={props.scale}
			>
				<meshBasicMaterial
					map={Rest_Baked_Map}
					side={DoubleSide}
					alphaMap={Rest_Baked_Alpha_Map}
					alphaTest={0.5}
				/>
			</a.mesh>
		</>
	);
}

useGLTF.preload("/intro-avatar/baked.glb");
