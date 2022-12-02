import { Canvas, MeshProps, ThreeElements, useFrame } from '@react-three/fiber';
import { Room } from '../SampleRoom';
import { Model } from './Model';
import { type Object } from '../SampleRoom';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls, Environment, Lightformer, PerspectiveCamera, ContactShadows, } from '@react-three/drei';
import { View, StyleSheet, Text} from 'react-native';

function Loading() {
	return (
		<mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
			<sphereGeometry attach="geometry" args={[1, 16, 16]} />
			<meshStandardMaterial
				attach="material"
				color="red"
				transparent
				opacity={0.6}
				roughness={1}
				metalness={0}
			/>
		</mesh>
	);
}

function SurfaceModel(props: { data: Object; index?: number }) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {

		setTimeout(() => {
			setLoading(false)
		}, 1000 * props.index!)

	}, []);
	if (!loading) {
		return (
			<>
				<Model data={props.data} key={props.data.id} minWidth={0.11} />
			</>
		);
	} else {
		return (
			<></>
		);
	}

}
function ObjectModel(props: { data: Object; index?: number }) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {

		setTimeout(() => {
			setLoading(false)
		}, 1000 * props.index!)

	}, []);
	if (!loading) {
		return (
			<>
				<Model data={props.data} key={props.data.id} minWidth={0.11} />
			</>
		);
	} else {
		return (
			<></>
		);
	}
}
function GroupScene({ data }: { data: Room }) {
	const group = useRef<THREE.Group>(null);
	const vect = new THREE.Vector3();
	useFrame(state => {
		// state.camera.lookAt(group.current!.position);
		// state.camera.position.lerp(vect.set(-5, 4, 2), 0.001);
		// // state.camera.rotateY(state.clock.elapsedTime * 0.1);
		// state.camera.updateProjectionMatrix();
		// group.current!.rotation.y += 0.005; 
	});
	let counter = 0;

	return (
		<>
			<group ref={group} dispose={null}>
				{data.surfaces.map(surface => {
					counter++;
					return (
						<>
							<SurfaceModel key={`s${surface.id}`} data={surface} index={counter} ></SurfaceModel>
						</>

					);
				})}
				counter --;
				{data.objects.map(object => {
					counter++;
					return (
						<ObjectModel key={`o${object.id}`} data={object} index={counter} ></ObjectModel>
					);

				})}
			</group>
		</>
	);
}
export function Viewer({ data }: { data: Room }) {

	return (
		<>
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<pointLight position={[-5, -5, -1]} />
				<directionalLight intensity={0.5} />
				<color attach="background" args={['#15151a']} />
				<Suspense fallback={<Loading />}>
					<GroupScene data={data} />
					<Environment resolution={512}>
						{/* Ceiling */}
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
						<Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
						{/* Sides */}
						<Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
						<Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
						{/* Key */}
						<Lightformer form="ring" color="red" intensity={10} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
					</Environment>
				</Suspense>
				<ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
				<OrbitControls
					autoRotate={true}
					autoRotateSpeed={-1}
					zoomSpeed={0.25}
					minZoom={40}
					maxZoom={140}
					enablePan={false}
					dampingFactor={0.05}
					minPolarAngle={Math.PI / 3}
					maxPolarAngle={Math.PI / 3}
				/>
				<PerspectiveCamera makeDefault position={[0, 0, 15]} fov={35} />
			</Canvas>
			<View style={styles.absolute}>
				<Text style={{ color: '#000' }}>Toggle</Text>
			</View>
		</>

	);
}

const styles = StyleSheet.create({
	absolute: {
		width: 100,
		height: 100,
		position: 'absolute',
		top: 0,
		left: 0,
		backgroundColor: '#5ca5cc',
	}
});
