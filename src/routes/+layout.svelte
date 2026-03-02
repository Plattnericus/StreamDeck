<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(*) {
		scrollbar-width: none !important;
	}
	:global(*::-webkit-scrollbar) {
		width: 0 !important;
		height: 0 !important;
		display: none !important;
	}
	:global(::-webkit-scrollbar-button) {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: transparent !important;
	}
	:global(::-webkit-scrollbar-track) {
		background: transparent !important;
	}
	:global(::-webkit-scrollbar-corner) {
		background: transparent !important;
	}
</style>
