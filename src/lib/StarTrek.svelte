<script lang="ts">
	import { Howl } from 'howler';
</script>

<body>
	<canvas id="starfield" />
	<div id="main-title">
		<div id="star-trek-logo">TRASH VAMPIRES</div>
		<div id="show-venue">THE CHAPEL</div>
		<div id="show-date">12/10/2021</div>
	</div>

	<script>
		var starTypes = [
			{
				type: 'O',
				trueColor: 'rgb(155, 176, 255)',
				visibleColor: 'rgb(195, 195, 195)'
			},
			{
				type: 'B',
				trueColor: 'rgb(170, 191, 255)',
				visibleColor: 'rgb(205, 205, 205)'
			},
			{
				type: 'A',
				trueColor: 'rgb(202, 215, 255)',
				visibleColor: 'rgb(224, 224, 224)'
			},
			{
				type: 'F',
				trueColor: 'rgb(248, 247, 255)',
				visibleColor: 'rgb(250, 250, 250)'
			},
			{
				type: 'G',
				trueColor: 'rgb(255, 244, 234)',
				visibleColor: 'rgb(244, 244, 244)'
			},
			{
				type: 'K',
				trueColor: 'rgb(255, 210, 161)',
				visibleColor: 'rgb(209, 209, 209)'
			},
			{
				type: 'M',
				trueColor: 'rgb(255, 204, 111)',
				visibleColor: 'rgb(190, 190, 190)'
			}
		];

		var song = new Howl({
			src: ['Tosk.mp3']
		});

		song.play();
		var starfield = document.getElementById('starfield');
		var starTrekLogo = document.getElementById('star-trek-logo');
		var width = (starfield.width = window.innerWidth);
		var height = (starfield.height = window.innerHeight);
		var numberOfStars = width / 5;
		var xSpeedModifier = 0.5;
		var ySpeedModifier = 0;
		var showTrueColors = false;
		var showTrueColors = false;

		// moving the mouse across the canves changes x and y speed
		function followCursor(p) {
			xSpeedModifier = ((p.pageX - width / 2) / width) * 2;
			ySpeedModifier = ((p.pageY - height / 2) / height) * 2;
		}

		// get random element from array
		getRandomElement = function (arr) {
			return arr[Math.floor(Math.random() * arr.length)];
		};

		// create an empty array of stars
		var stars = [];

		// creates one star
		function createStar() {
			var speed = Math.random() * 3.5 + 0.5;
			// get random star type (mainly color/brightness)
			var starType = getRandomElement(starTypes);
			return {
				trueColor: starType.trueColor,
				visibleColor: starType.visibleColor,
				x: Math.random() * starfield.width,
				y: Math.random() * starfield.height,
				size: Math.random() * 2,
				xSpeed: speed,
				ySpeed: speed
			};
		}

		// adds one star to array
		function addStar() {
			stars.push(createStar());
		}

		// adds n stars to array
		function addNStars(n) {
			for (var i = 0; i < n; i++) addStar();
		}

		// generates initial stars
		addNStars(numberOfStars);

		// clicking on the canvas adds stars
		function handleStarfieldClick(e) {
			addNStars(100);
		}

		// force touch on iPhone also adds stars
		function handleForceTouch(e) {
			var force = e.changedTouches[0].force;
			if (force >= 1) addNStars(100);
		}

		document.body.addEventListener('click', handleStarfieldClick);
		document.body.addEventListener('touchforcechange', handleForceTouch);

		// toggles true color stars (i.e. real colors of stars)
		function handleLogoClick(e) {
			e.preventDefault();
			showTrueColors = !showTrueColors;
		}

		starTrekLogo.addEventListener('click', handleLogoClick);

		var ctx = starfield.getContext('2d');

		function draw() {
			// redraw screen in black with alpha channel for fading of stars
			ctx.fillStyle = 'rgba(0, 0, 0, .2)';
			ctx.fillRect(0, 0, width, height);

			// loop through all stars, draw them and add +1 to position
			stars.forEach(function (star, index) {
				// star color
				ctx.fillStyle = showTrueColors ? star.trueColor : star.visibleColor;

				// plot star
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();

				// increase star position with speed, check edges
				star.x = star.x < 0 ? (star.x = width - 1) : star.x + xSpeedModifier * star.xSpeed;
				star.x = star.x % width;

				star.y = star.y < 0 ? (star.y = height - 1) : star.y + ySpeedModifier * star.ySpeed;
				star.y = star.y % height;
			});
			// recusively animate stars
			window.requestAnimationFrame(draw);
		}

		// start animating stars
		window.requestAnimationFrame(draw);
	</script>
</body>

<style type="text/css">
	body {
		margin: 0;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	#main-title {
		display: flex;
		flex-direction: column;
	}

	#starfield {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	/*
	Blue: #38a0e1
	Gold: #efb200
	Silver: #aaa9a9
	*/

	#star-trek-logo {
		padding: 10px;
		z-index: 2;
		color: #efb200;
		font-size: 80px;
		font-family: 'Roddenberry', Verdana, Tahoma;
		text-align: center;
		cursor: pointer;
		animation: zoom 0.5s 1 ease-out forwards 5s;
		animation-fill-mode: both;
		overflow: visible;
		user-select: none;
		transform: scale(100);
	}

	#show-venue {
		padding: 10px;
		z-index: 2;
		color: #aaa9a9;
		font-size: 80px;
		font-family: 'Roddenberry', Verdana, Tahoma;
		text-align: center;
		cursor: pointer;
		animation: zoom 0.5s 1 ease-out forwards 8s;
		animation-fill-mode: both;
		overflow: visible;
		user-select: none;
		transform: scale(100);
	}

	#show-date {
		padding: 10px;
		z-index: 2;
		color: #aaa9a9;
		font-size: 80px;
		font-family: 'Roddenberry', Verdana, Tahoma;
		text-align: center;
		cursor: pointer;
		animation: zoom 0.5s 1 ease-out forwards 11s;
		animation-fill-mode: both;
		overflow: visible;
		user-select: none;
		transform: scale(100);
	}

	@keyframes zoom {
		0% {
			transform: scale(20);
			opacity: 0;
		}
		100% {
			transform: scale(1);
		}
	}
</style>
