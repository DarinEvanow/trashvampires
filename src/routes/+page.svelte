<script>
	import { onMount } from 'svelte';
	import { Clock } from 'three';
	import { Canvas } from '@threlte/core';

	import Copy from '$lib/Copy.svelte';
	import SceneManager from '$lib/SceneManager';

	function triggerFlash() {
		setTimeout(() => {
			document.getElementsByTagName('div')[1].style.opacity = '0';
		}, 6800);

		setTimeout(() => {
			document.getElementsByTagName('div')[1].style.transitionProperty = 'opacity';
			document.getElementsByTagName('div')[1].style.transitionDuration = '10s';
			document.getElementsByTagName('div')[1].style.opacity = '1';
			document.getElementsByTagName('h1')[0].style.display = 'flex';
			document.getElementsByTagName('h2')[0].style.display = 'flex';
			document.getElementById('links').style.display = 'flex';
		}, 7000);
	}

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();
		clock.stop();
		let promise = document.getElementById('atomic').play();

		if (promise !== undefined) {
			promise
				.then(() => {
					clock.start();
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'none';

					triggerFlash();
				})
				.catch(() => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'block';
					playButton?.addEventListener('click', () => {
						document.getElementById('atomic').play();
						playButton.style.display = 'none';
						clock.start();

						triggerFlash();
					});
				});
		}

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
	});
</script>

<div id="container">
	<audio src="atomic_edit.mp3" id="atomic" />
	<Copy />
	<Canvas />
</div>

<style>
	#container {
		height: 100vh;
		width: 100vw;
	}
</style>
