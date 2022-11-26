export function bindEventListeners(canvas, sceneManager) {
	window.onresize = resizeCanvas;
	document.addEventListener('touchmove', (e) => {
		sceneManager.onDocumentMouseMove(e.touches[0]);
	});
	document.addEventListener('mousemove', (e) => {
		sceneManager.onDocumentMouseMove(e);
	});
	resizeCanvas(canvas, sceneManager);
}

function resizeCanvas(canvas, sceneManager) {
	canvas.style.width = '100%';
	canvas.style.height = '100%';

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	sceneManager.onWindowResize();
}
