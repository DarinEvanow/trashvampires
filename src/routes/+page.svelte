<script>
	import { onMount } from 'svelte';
	import { Canvas } from '@threlte/core';

	import SceneManager from '$lib/SceneManager';
	import { Clock } from 'three';

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();

		const sceneManager = new SceneManager(canvas, clock);

		bindEventListeners();
		render();

		function bindEventListeners() {
			window.onresize = resizeCanvas;
			document.addEventListener('touchmove', (e) => {
				sceneManager.onDocumentMouseMove(e.touches[0]);
			});
			document.addEventListener('mousemove', (e) => {
				sceneManager.onDocumentMouseMove(e);
			});
			resizeCanvas();
		}

		function resizeCanvas() {
			canvas.style.width = '100%';
			canvas.style.height = '100%';

			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;

			sceneManager.onWindowResize();
		}

		function render() {
			requestAnimationFrame(render);
			sceneManager.update();
		}

		setTimeout(() => {
			document.getElementsByTagName('div')[1].style.opacity = '0';
		}, 2000);

		setTimeout(() => {
			document.getElementsByTagName('div')[1].style.transitionProperty = 'opacity';
			document.getElementsByTagName('div')[1].style.transitionDuration = '10s';
			document.getElementsByTagName('div')[1].style.opacity = '1';
		}, 2200);
	});
</script>

<div>
	<Canvas />
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
