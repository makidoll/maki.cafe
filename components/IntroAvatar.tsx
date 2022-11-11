import { Box, BoxProps } from "@chakra-ui/react";
import { config, useSpring } from "@react-spring/three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { lazy, useState } from "react";
import { Euler, Vector3 } from "three";

const Deg2Rad = 0.0174533;

function RotateInOrbitControls(props: { rotationY?: number }) {
	const { gl, camera } = useThree();

	useSpring({
		y: props.rotationY,
		config: config.molasses,
		onFrame: ({ y }) => {
			console.log(y);
			camera.rotation.y = y;
		},
	});

	return (
		<OrbitControls
			makeDefault
			enableZoom={false}
			enablePan={false}
			autoRotate={true}
			autoRotateSpeed={-1}
			args={[camera, gl.domElement]}
			// height
			minPolarAngle={Math.PI / 2.5}
			maxPolarAngle={Math.PI / 2.5}
		/>
	);
}

const startDegrees = 180 * Deg2Rad;
const endDegrees = -80 * Deg2Rad;

const scale = 0.08;
const startScale = 0.5 * scale;
const endScale = 1 * scale;

export default function IntroAvatar(props: BoxProps) {
	// const IntroAvatarModel = dynamic(() => import("./IntroAvatarModel"), {
	// 	ssr: false,
	// });

	const IntroAvatarModel = lazy(() => import("./IntroAvatarModel"));

	const [opacity, setOpacity] = useState(0);

	const [{ rotationY, scale }] = useSpring(
		{
			rotationY: opacity == 0 ? startDegrees : endDegrees,
			scale: opacity == 0 ? startScale : endScale,
			config: config.molasses,
		},
		[opacity],
	);

	return (
		<Box
			w={"100vw"}
			h={"30vh"}
			{...props}
			transition={"opacity 0.5s linear"}
			opacity={opacity}
		>
			<Canvas flat camera={{ fov: 1 }}>
				{/* <Bounds fit clip observe margin={1} damping={0}> */}
				<IntroAvatarModel
					position={new Vector3(0, -0.025, 0)}
					rotationY={rotationY}
					scale={scale}
					onLoaded={() => {
						setTimeout(() => {
							setOpacity(1);
						}, 10);
					}}
				/>
				{/* </Bounds> */}
				<RotateInOrbitControls
					rotationY={opacity == 0 ? 180 * Deg2Rad : -80 * Deg2Rad}
				/>
				{/* <EffectComposer>
					<ChromaticAberration
						blendFunction={BlendFunction.DIVIDE}
						offset={new Vector2(0.002, 0.002)}
					/>
				</EffectComposer> */}
			</Canvas>
		</Box>
	);
}
