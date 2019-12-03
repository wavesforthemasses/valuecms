<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === 'development';
</script>

<style>
	h1, p { @mixins: mx(auto) my(0); }
	h1 { @mixins: font(4xl, 700) mb(2); }
	p { @mixins: my(1); }
	@media (min-width: 480px) {
		h1 { @mixins: font(6xl); }
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
