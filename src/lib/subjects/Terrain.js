import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { default as vert } from '../shaders/SandVert.glsl?raw';
import { default as frag } from '../shaders/SandFrag.glsl?raw';

function Terrain(scene, terrainDimensions, clock) {
	const sand = new THREE.TextureLoader().load('/images/sand.png');
	const blueSand = new THREE.TextureLoader().load('/images/blue-sand.jpg');

	let texture = sand;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(4, 4);

	const sandMaterial = new THREE.MeshPhongMaterial({
		map: texture,
		shininess: 0
	});

	const mesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry(terrainDimensions[0], terrainDimensions[1], 60, 60),
		[
			new THREE.ShaderMaterial({
				transparent: true,
				vertexShader: vert,
				fragmentShader: frag,
				uniforms: THREE.ShaderLib.phong.uniforms
			}),
			sandMaterial
		]
	);

	mesh.geometry.clearGroups();
	mesh.geometry.addGroup(0, Infinity, 0);
	mesh.geometry.addGroup(0, Infinity, 1);

	mesh.position.set(-70, 6, -30);

	const peak = 1.5;
	const smoothing = 12000 / terrainDimensions[1];
	const vertices = mesh.geometry.attributes.position.array;

	const noise2D = createNoise2D();

	for (let i = 0; i <= vertices.length; i += 3) {
		vertices[i + 2] = peak * noise2D(vertices[i] / smoothing, vertices[i + 1] / smoothing);
	}
	mesh.geometry.attributes.position.needsUpdate = true;
	mesh.geometry.computeVertexNormals();

	mesh.rotation.x = -Math.PI / 2.3;

	// mesh.castShadow = true;
	mesh.receiveShadow = true;

	mesh.matrixAutoUpdate = false;
	mesh.updateMatrix();

	scene.add(mesh);

	this.update = function (time) {
		if (clock.elapsedTime > 2) {
			blueSand.wrapS = THREE.RepeatWrapping;
			blueSand.wrapT = THREE.RepeatWrapping;
			blueSand.repeat.set(4, 4);
			sandMaterial.map = blueSand;
		}
	};
}

export default Terrain;
