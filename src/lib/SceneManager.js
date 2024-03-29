import * as THREE from 'three';
import GeneralLights from '$lib/subjects/GeneralLights';
import Rock from '$lib/subjects/Rock';
import Terrain from '$lib/subjects/Terrain';
import Water from '$lib/subjects/Water';
import Fish from '$lib/subjects/Fish';

function SceneManager(canvas, clock) {
	const screenDimensions = {
		width: canvas.width,
		height: canvas.height
	};

	const DPR = window.devicePixelRatio ? Math.min(window.devicePixelRatio, 2) : 1;
	const camParams = {
		default: [100, 100, 100],
		range: [60, 60],
		lookat: [20, -2, 15]
	};

	const terrainDimensions = [320, 250];

	const scene = buildScene();
	const bufferScene = buildScene();
	bufferScene.background = new THREE.Color('#000');
	const renderer = buildRender(screenDimensions);
	const camera = buildCamera(screenDimensions);
	const sceneSubjects = createSceneSubjects(scene, camera);
	const { colorTarget, depthTarget } = createTargets();

	let mouseX = camParams.default[0];
	let mouseY = camParams.default[1];

	const materialDepth = new THREE.MeshDepthMaterial({ morphTargets: true });
	materialDepth.depthPacking = THREE.RGBADepthPacking;
	materialDepth.blending = THREE.NoBlending;

	function buildScene() {
		const scene = new THREE.Scene();

		return scene;
	}

	function buildRender({ width, height }) {
		const renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: false,
			alpha: true,
			depth: true,
			stencil: false
		});

		renderer.setPixelRatio(DPR);
		renderer.setSize(width, height);

		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.autoClear = false;

		return renderer;
	}

	function buildCamera({ width, height }) {
		const aspectRatio = width / height;
		const fieldOfView = 35;
		const nearPlane = 0.3;
		const farPlane = 400;
		const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

		camera.position.set(camParams.default[0], camParams.default[1], camParams.default[2]);
		camera.lookAt(new THREE.Vector3(camParams.lookat[0], camParams.lookat[1], camParams.lookat[2]));

		return camera;
	}

	function createSceneSubjects(scene, camera) {
		const sceneSubjects = [
			new GeneralLights(bufferScene),
			new Terrain(bufferScene, terrainDimensions, clock),
			new Water(
				scene,
				camera,
				terrainDimensions,
				{
					DPR,
					width: screenDimensions.width,
					height: screenDimensions.height
				},
				clock
			),
			new Rock(bufferScene),
			new Fish(bufferScene, clock)
		];

		return sceneSubjects;
	}

	function createTargets() {
		const colorTarget = new THREE.WebGLRenderTarget(
			window.innerWidth * DPR,
			window.innerHeight * DPR
		);

		colorTarget.texture.format = THREE.RGBFormat;
		colorTarget.texture.minFilter = THREE.NearestFilter;
		colorTarget.texture.magFilter = THREE.NearestFilter;
		colorTarget.depthBuffer = true;
		colorTarget.stencilBuffer = false;

		const depthTarget = new THREE.WebGLRenderTarget(
			window.innerWidth * DPR,
			window.innerHeight * DPR
		);

		depthTarget.texture.format = THREE.RGBAFormat;
		depthTarget.texture.minFilter = THREE.NearestFilter;
		depthTarget.texture.magFilter = THREE.NearestFilter;
		depthTarget.depthBuffer = true;
		depthTarget.stencilBuffer = false;

		return { colorTarget, depthTarget };
	}

	this.update = function (audioPlayTime) {
		const deltaTime = clock.getDelta();

		camera.position.x += (mouseX - camera.position.x) * 0.05;
		camera.position.y += (mouseY - camera.position.y) * 0.05;

		camera.lookAt(camParams.lookat[0], camParams.lookat[1], camParams.lookat[2]);

		renderer.clear();

		for (let i = 0; i < sceneSubjects.length; i++) {
			sceneSubjects[i].update(deltaTime, colorTarget, depthTarget, audioPlayTime);
		}

		renderer.setRenderTarget(colorTarget);
		renderer.render(bufferScene, camera);

		// render buffer scene for water depth texture
		bufferScene.overrideMaterial = materialDepth;
		renderer.setRenderTarget(depthTarget);
		renderer.render(bufferScene, camera);

		renderer.setRenderTarget(null);
		bufferScene.overrideMaterial = null;

		// render buffer scene and then render water on top
		renderer.render(bufferScene, camera);
		renderer.render(scene, camera);
	};

	this.onWindowResize = function () {
		const { width, height } = canvas;

		screenDimensions.width = width;
		screenDimensions.height = height;

		camera.aspect = width / height;
		camera.fov = Math.min((4 * height) / Math.pow(width, 0.7), 40);
		camera.updateProjectionMatrix();

		renderer.setSize(width, height);
		const dpr = Math.min(renderer.getPixelRatio(), 2);
		depthTarget.setSize(width * dpr, height * dpr);
		colorTarget.setSize(width * dpr, height * dpr);

		for (const subject of sceneSubjects) {
			if (subject.onResize) {
				subject.onResize({
					width: width,
					height: height,
					DPR: dpr
				});
			}
		}
	};

	this.onDocumentMouseMove = function (event) {
		const { width, height } = canvas;

		mouseX =
			camParams.default[0] - camParams.range[0] / 2 + (event.clientX / width) * camParams.range[0];
		mouseY =
			camParams.default[1] + camParams.range[1] / 2 - (event.clientY / height) * camParams.range[1];
	};
}

export default SceneManager;
