import {
	Environment,
	Float,
	OrbitControls,
	PerspectiveCamera,
	Stars,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import FloatingIsland from "./FloatingIsland";
import Portal from "./Portal";
import Rocks from "./Rocks";
import FloatingRocks from "./FloatingRocks";
import Trees from "./Trees";
import Grass from "./Grass";
import {
	BrightnessContrast,
	ChromaticAberration,
	DepthOfField,
	EffectComposer,
	GodRays,
	HueSaturation,
} from "@react-three/postprocessing";
import { Color, CylinderGeometry, MeshBasicMaterial, Mesh } from "three";
import { BlendFunction, KernelSize, Resizer } from "postprocessing";
import SceneParticles from "./SceneParticles";

let mesh = new Mesh(
	new CylinderGeometry(0.3, 0.3, 0.2, 20),
	new MeshBasicMaterial({
		color: new Color(1, 0.2, 0.1),
		transparent: true,
		opacity: 1,
	})
);

mesh.rotation.x = Math.PI * 0.5;
mesh.position.set(1.17, 10.7, -4.1);
mesh.scale.set(1.5, 1, 1);

export default function Experience() {
	return (
		<>
			<Perf position="top-left" />
			<Suspense fallback={null}>
				<Environment background={"only"} files={"./bg.hdr"} />
				<Environment background={false} files={"./envmap.hdr"} />
				<PerspectiveCamera
					makeDefault
					fov={50}
					position={[-1.75, 10.85, 20.35]}
				/>
				<OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />

				<Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.6}>
					<primitive object={mesh} />
					<spotLight
						penumbra={1}
						distance={500}
						angle={60.65}
						attenuation={1}
						anglePower={3}
						intensity={0.3}
						color={new Color(1, 0.2, 0.1)}
						position={[1.19, 10.85, -4.45]}
						target-position={[0, 0, -1]}
					/>
					<FloatingIsland />
					<Portal />
					<Rocks />
					<Trees />
					<Grass />
					<SceneParticles />
				</Float>
				<Stars
					radius={100}
					depth={100}
					count={5000}
					factor={1}
					saturation={0}
					fade
					speed={1}
				/>
				<FloatingRocks />

				<EffectComposer stencilBuffer={true}>
					<DepthOfField
						focusDistance={0.012}
						focalLength={0.015}
						bokehScale={7}
					/>
					<HueSaturation hue={0} saturation={-0.15} />
					<BrightnessContrast brightness={0.0} contrast={0.035} />
					<ChromaticAberration
						radialModulation={true}
						offset={[0.00175, 0.00175]}
					/>
					<GodRays
						sun={mesh}
						blendFunction={BlendFunction.Screen}
						samples={40}
						density={0.97}
						decay={0.97}
						weight={0.6}
						exposure={0.3}
						clampMax={1}
						width={Resizer.AUTO_SIZE}
						height={Resizer.AUTO_SIZE}
						kernelSize={KernelSize.SMALL}
						blur={true}
					/>
				</EffectComposer>
			</Suspense>
		</>
	);
}
