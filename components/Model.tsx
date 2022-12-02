import React from 'react';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { type Object } from '../SampleRoom';

export function Model(props: ThreeElements['mesh'] & { data: Object; minWidth?: number }) {
	const mesh = useRef<THREE.Mesh>(null!);

	const { scale, transform } = props.data;
	const [n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44] = transform;
	var frameHeight = 0;
	useEffect(() => {
		if (mesh.current) {
			const transforms = new THREE.Matrix4();
			transforms.set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44);

			transforms.transpose();
			mesh.current.applyMatrix4(transforms);

			const width = props.minWidth ? Math.max(scale.z, props.minWidth) : scale.z;
			mesh.current.scale.set(scale.x, scale.y, width);
		}
	}, [mesh]);

	useFrame((state, delta) => {
		if (frameHeight <= scale.y) {
			const width2 = props.minWidth ? Math.max(scale.z, props.minWidth) : scale.z;
			mesh.current.scale.set(scale.x, frameHeight, width2);
			frameHeight = frameHeight + 0.25;
		}

		// const time = clock.getElapsedTime()

		// if (isClick) {
		//   gsap.to(camera.position, {
		// 	x: () => 0,
		// 	y: () => 0,
		// 	duration: 10
		//   }) 
		// } 
		// if (!isClick) {
		//   gsap.to(camera.position, {
		// 	x: () => oldPos.x,
		// 	y: () => oldPos.y,
		// 	duration: 10
		//   })
		// }
	});

	return (
		<mesh {...props} ref={mesh} castShadow={true} receiveShadow>
			<boxGeometry args={[1, 1, 1, 1]} />
			<meshLambertMaterial color={'grey'} />
		</mesh>
	);
}
