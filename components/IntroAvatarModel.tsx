import { a, SpringValue } from "@react-spring/three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { DoubleSide, LinearFilter, Mesh, Vector3 } from "three";

export default function IntroAvatarModel(props: {
	position?: Vector3;
	rotationY?: SpringValue<number>;
	scale?: SpringValue<number>;
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

	const map = useTexture("/intro-avatar/baked.webp");
	// texture.anisotropy = 4;
	map.magFilter = LinearFilter;
	map.minFilter = LinearFilter;
	map.generateMipmaps = true;

	const alphaMap = useTexture("/intro-avatar/baked-alpha.webp");
	// texture.anisotropy = 4;
	alphaMap.magFilter = LinearFilter;
	alphaMap.minFilter = LinearFilter;
	alphaMap.generateMipmaps = true;

	useEffect(() => {
		if (props.onLoaded) props.onLoaded();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<a.mesh
			geometry={mesh?.geometry}
			position={props.position}
			rotation-y={props.rotationY}
			scale={props.scale}
		>
			<meshBasicMaterial
				map={map}
				alphaMap={alphaMap}
				alphaTest={0.5}
				side={DoubleSide}
			/>
		</a.mesh>
	);
}

useGLTF.preload("/intro-avatar/baked.glb");
