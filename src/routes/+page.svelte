<script>
	import { onMount } from 'svelte';
	import { Clock } from 'three';
	import { Canvas } from '@threlte/core';

	import Audio, { playAudio, audioTriggered } from '$lib/Audio.svelte';
	import Copy from '$lib/Copy.svelte';
	import SceneManager from '$lib/SceneManager';

	onMount(() => {
		let audioTriggeredValue;

		audioTriggered.subscribe((value) => {
			audioTriggeredValue = value;
		});

		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();
		playAudio(clock);

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
			sceneManager.update(audioTriggeredValue);
		}
	});
</script>

<div id="container">
	<Audio />
	<Copy />
	<Canvas />
</div>

<style>
	#container {
		height: 100vh;
		width: 100vw;
	}
</style>
