<script>
	import { onMount } from 'svelte';
	import { Clock } from 'three';
	import { Canvas } from '@threlte/core';

	import SceneManager from '$lib/SceneManager';

	onMount(() => {
		const canvas = document.getElementsByTagName('canvas')[0];
		const clock = new Clock();
		clock.stop();
		let promise = document.getElementById('atomic').play();

		if (promise !== undefined) {
			promise
				.then((_) => {
					clock.start();
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'none';

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
				})
				.catch((error) => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'block';
					console.log('testing');
					playButton?.addEventListener('click', () => {
						document.getElementById('atomic').play();
						playButton.style.display = 'none';
						clock.start();

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
	<div id="play-button" class="squiggly">&#128264;</div>
	<div id="copy">
		<h1 class="squiggly">atomic<br />rock<br />beach</h1>
		<h2 class="squiggly">tape release show: <br />december 17, el rio, 3-8pm</h2>
		<div id="links" class="squiggly">
			<a
				href="https://trashvampires.bandcamp.com/album/atomic-rock-beach"
				target="_blank"
				rel="noreferrer">bandcamp</a
			>
			<a href="https://www.instagram.com/trashvampires/" target="_blank" rel="noreferrer"
				>instagram</a
			>
		</div>
	</div>

	<Canvas />
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
	<defs>
		<filter id="squiggly-0">
			<feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
			<feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
		</filter>
		<filter id="squiggly-1">
			<feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
		</filter>

		<filter id="squiggly-2">
			<feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
		</filter>
		<filter id="squiggly-3">
			<feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
		</filter>

		<filter id="squiggly-4">
			<feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
			<feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
		</filter>
	</defs>
</svg>

<style>
	#container {
		height: 100vh;
		width: 100vw;
	}

	#copy {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 85vh;
		width: 100vw;
		position: absolute;
	}

	#play-button {
		display: none;
		position: absolute;
		text-align: center;
		top: 50%;
		left: 0;
		right: 0;
		font-size: 80px;
		cursor: pointer;
		z-index: 100;
	}

	@keyframes squiggly-anim {
		0% {
			filter: url('#squiggly-0');
		}

		25% {
			filter: url('#squiggly-1');
		}

		50% {
			filter: url('#squiggly-2');
		}

		75% {
			filter: url('#squiggly-3');
		}

		100% {
			filter: url('#squiggly-4');
		}
	}

	.squiggly {
		animation: squiggly-anim 0.34s linear infinite;
		opacity: 1;
	}
	h1 {
		font-size: 96px;
		font-family: 'Caveat', cursive;
		color: white;
		display: none;
		text-align: center;
	}

	h2 {
		font-size: 36px;
		font-family: 'Caveat', cursive;
		color: white;
		display: none;
		text-align: center;
	}

	#links {
		font-size: 30px;
		font-family: 'Caveat', cursive;
		color: white;
		text-align: center;
		display: none;
		flex-direction: row;
		justify-content: space-around;
		width: 280px;
	}

	a {
		color: inherit;
	}

	svg {
		display: block;
		height: 0;
		width: 0;
	}
</style>
