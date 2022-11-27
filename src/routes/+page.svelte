<script>
	import { onMount } from 'svelte';
	import { Clock } from 'three';
	import { Canvas } from '@threlte/core';

	import Audio, { playAudio, audioPlayTime } from '$lib/Audio.svelte';
	import { triggerFlash, flashTriggered } from '$lib/utils/flash';
	import Copy from '$lib/Copy.svelte';
	import SceneManager from '$lib/SceneManager';

	onMount(() => {
		let audioPlayTimeValue;
		let flashTriggeredValue;
		const audio = document.getElementById('atomic');

		audioPlayTime.subscribe((value) => {
			audioPlayTimeValue = value;
		});

		flashTriggered.subscribe((value) => {
			flashTriggeredValue = value;
		});

		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();
		playAudio();

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
			triggerFlash(audioPlayTimeValue, flashTriggeredValue);
			audioPlayTime.update(() => audio.currentTime);
			sceneManager.update(audioPlayTimeValue);
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
