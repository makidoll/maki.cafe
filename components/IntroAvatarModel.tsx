import { a, SpringValue } from "@react-spring/three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { DoubleSide, Mesh, Vector3 } from "three";

export default function IntroAvatarModel(props: {
	position?: Vector3;
	rotationY?: SpringValue;
	scale?: number;
	onLoaded?: () => any;
}) {
	const { nodes } = useGLTF("/intro-avatar/baked.glb");

	const mesh = useMemo(() => {
		for (const name of Object.keys(nodes)) {
			if (nodes[name].type == "Mesh") {
				return nodes[name] as Mesh;
			}
		}
	}, [nodes]);

	const texture = useTexture("/intro-avatar/baked.jpg");
	texture.anisotropy = 4;

	useEffect(() => {
		if (props.onLoaded) props.onLoaded();
	}, []);

	return (
		<a.mesh
			geometry={mesh?.geometry}
			position={props.position}
			rotation-y={props.rotationY}
			scale={props.scale}
		>
			<meshBasicMaterial map={texture} side={DoubleSide} />
		</a.mesh>
	);
}

useGLTF.preload("/intro-avatar/baked.glb");
