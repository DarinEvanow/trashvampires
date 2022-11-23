<script>
	import { Canvas } from '@threlte/core';
	import Camera from '$lib/Camera.svelte';
</script>

<div>
	<Canvas>
		<Camera />
	</Canvas>
</div>

<style>
	div {
		height: 100vh;
		width: 100vw;
	}
</style>
