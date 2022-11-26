<script>
	import { onMount } from 'svelte';
	import { Clock } from 'three';
	import { Canvas } from '@threlte/core';

	import Audio, { playAudio } from '$lib/Audio.svelte';
	import Copy from '$lib/Copy.svelte';
	import SceneManager from '$lib/SceneManager';
	import { bindEventListeners } from '$lib/utils/eventListeners';

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();
		clock.stop();
		playAudio(clock);

		const sceneManager = new SceneManager(canvas, clock);
		bindEventListeners(canvas, sceneManager);
		render();

		function render() {
			requestAnimationFrame(render);
			sceneManager.update();
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
