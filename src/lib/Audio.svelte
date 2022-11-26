<script context="module">
	import { triggerFlash } from '$lib/utils/flash';

	export function playAudio(clock) {
		let promise = document.getElementById('atomic').play();

		if (promise !== undefined) {
			promise
				.then(() => {
					clock.start();
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'none';

					triggerFlash(clock);
				})
				.catch(() => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'block';
					playButton?.addEventListener('click', () => {
						document.getElementById('atomic').play();
						playButton.style.display = 'none';
						clock.start();

						triggerFlash(clock);
					});
				});
		}
	}
</script>

<audio src="atomic_edit.mp3" id="atomic" />
