import { writable } from 'svelte/store';

export const flashTriggered = writable(false);

export function triggerFlash(audioPlayTime, flashTriggeredValue) {
	if (audioPlayTime > 6.6 && !flashTriggeredValue) {
		flashTriggered.update(() => true);
		document.getElementsByTagName('div')[1].style.opacity = '0';

		setTimeout(() => {
			document.getElementsByTagName('div')[1].style.transitionProperty = 'opacity';
			document.getElementsByTagName('div')[1].style.transitionDuration = '7s';
			document.getElementsByTagName('div')[1].style.opacity = '1';
			document.getElementsByTagName('h1')[0].style.display = 'flex';
			document.getElementsByTagName('h2')[0].style.display = 'flex';
			document.getElementById('links').style.display = 'flex';
		}, 200);
	}
}
