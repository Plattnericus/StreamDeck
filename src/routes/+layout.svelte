<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
	:global(::-webkit-scrollbar-button) {
		display: none;
		width: 0;
		height: 0;
	}

	:global(::-webkit-scrollbar-corner) {
		background: transparent;
	}
</style>
