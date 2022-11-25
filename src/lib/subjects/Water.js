import * as THREE from 'three';
import { default as frag } from '../shaders/WaterFrag.glsl?raw';
import { default as vert } from '../shaders/WaterVert.glsl?raw';

function Water(scene, camera, terrainDimensions, screenDimensions, clock) {
	const material = new THREE.ShaderMaterial({
		uniforms: {
			tDepth: { value: null },
			tEnv: { value: null },
			screenSize: new THREE.Uniform([
				screenDimensions.width * screenDimensions.DPR,
				screenDimensions.height * screenDimensions.DPR
			]),
			uTime: {
				value: 0.0
			},
			waterColor: new THREE.Uniform([0.2, 0.6, 1.0, 1]),
			foamColor: new THREE.Uniform([0.7, 0.95, 1.0, 0.75]),
			cameraNear: { value: camera.near },
			cameraFar: { value: camera.far }
		},
		vertexShader: vert,
		fragmentShader: frag,
		transparent: true,
		depthWrite: false
	});

	const mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(terrainDimensions[0], terrainDimensions[1], 100, 100),
		material
	);

	mesh.rotateX(Math.PI / -2);
	mesh.position.set(-70, 0, 0);
	mesh.castShadow = true;
	mesh.receiveShadow = true;

	scene.add(mesh);

	this.update = function (deltaTime, colorTarget, depthTarget) {
		material.uniforms.tDepth.value = depthTarget.texture;
		material.uniforms.tEnv.value = colorTarget.texture;
		material.uniforms.uTime.value += deltaTime;

		if (clock.elapsedTime > 6.9) {
			material.uniforms.waterColor.value = [1.1, 0.463, 0.75, 1];
			material.uniforms.foamColor.value = [255, 0.85, 255, 0.75];
		}
	};

	this.onResize = function (screenDimensions) {
		material.uniforms.screenSize = new THREE.Uniform([
			screenDimensions.width * screenDimensions.DPR,
			screenDimensions.height * screenDimensions.DPR
		]);
	};
}

export default Water;
