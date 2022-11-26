export function triggerFlash(clock) {
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
