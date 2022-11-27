<script context="module">
	import { writable } from 'svelte/store';

	export const audioPlayTime = writable(0);

	export function playAudio() {
		let promise = document.getElementById('atomic').play();

		if (promise !== undefined) {
			promise
				.then(() => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'none';
				})
				.catch(() => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'block';
					playButton?.addEventListener('click', () => {
						document.getElementById('atomic').play();
						playButton.style.display = 'none';
					});
				});
		}
	}
</script>

<audio src="atomic_edit.mp3" id="atomic" />
