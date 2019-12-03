<script>
	import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
	function handleSubmit(event) {
		event.preventDefault();

		const fd = new FormData(this);
		const data = {};
		for (const [key, value] of fd) {
			data[key] = value;
		}

		dispatch('save', data);
	}
</script>

<style>
	form{
		@mixins: w(full) mx(auto);
	}

	form :global(.input-field){
    @mixins: w(full);
  }

	form :global(label){
    @apply block uppercase tracking-wide text-gray-700;
		@mixins: mb(2) font(xs, bold);
  }

  form :global(label.active){
    @apply text-primary;
  }

  form :global(.hint){
    @apply text-gray-600;
		@mixins: mb(3) font(xs, italic);
  }
</style>

<form on:submit={handleSubmit}>
	<slot/>
</form>
