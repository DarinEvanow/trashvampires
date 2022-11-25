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
			document.getElementsByTagName('h1')[0].style.display = 'block';
			document.getElementsByTagName('h2')[0].style.display = 'block';
			document.getElementById('links').style.display = 'flex';
		}, 2200);
	});
</script>

<div id="container">
	<h1 class="squiggly">atomic<br />rock<br />beach</h1>
	<h2 class="squiggly">tape release show: <br />december 17, el rio, 3-8pm</h2>
	<div id="links" class="squiggly">
		<a href="https://open.spotify.com/artist/52IYxCUtczp1dXQinQDlxT?si=i-5jUaB4QTu4kxNmkKgBhw"
			>spotify</a
		>
		<a href="https://www.instagram.com">instagram</a>
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
		transform: translate(-50%, -50%);
	}
	h1 {
		font-size: 96px;
		font-family: 'Caveat', cursive;
		color: white;
		display: none;
		position: absolute;
		text-align: center;
		top: 30%;
		left: 50%;
		flex-direction: column;
	}

	h2 {
		font-size: 40px;
		font-family: 'Caveat', cursive;
		color: white;
		display: none;
		position: absolute;
		text-align: center;
		top: 70%;
		left: 50%;
		flex-direction: column;
	}

	#links {
		font-size: 30px;
		font-family: 'Caveat', cursive;
		color: white;
		position: absolute;
		text-align: center;
		top: 90%;
		left: 50%;
		display: none;
		flex-direction: row;
		justify-content: space-around;
		width: 200px;
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
