<script context="module">
	import { triggerFlash } from '$lib/utils/flash';
	import { writable } from 'svelte/store';

	export const audioTriggered = writable(false);

	export function playAudio(audioClock, sceneClock) {
		let promise = document.getElementById('atomic').play();

		if (promise !== undefined) {
			promise
				.then(() => {
					audioClock.start();
					sceneClock.start();
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'none';
					audioTriggered.update(() => true);

					triggerFlash();
				})
				.catch(() => {
					const playButton = document.getElementById('play-button');
					playButton.style.display = 'block';
					playButton?.addEventListener('click', () => {
						document.getElementById('atomic').play();
						playButton.style.display = 'none';
						audioClock.start();
						sceneClock.start();
						audioTriggered.update(() => true);

						triggerFlash();
					});
				});
		}
	}
</script>

<audio src="atomic_edit.mp3" id="atomic" />
