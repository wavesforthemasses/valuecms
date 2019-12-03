<script>
  import {fade} from 'svelte/transition'
  import { onMount } from 'svelte'
  let ifTrue = "loading";
	export { ifTrue as if };

  onMount(() => {
    if(ifTrue == "loading") ifTrue = false
  })
</script>

<style>
  .loading{
    @apply bg-primary text-white;
    @mixins: z(9999) fixed(full) place-items(center);
  }
</style>

{#if ifTrue === true || ifTrue == "loading"}
  <div class="loading" out:fade>
    <slot>Loading...</slot>
  </div>
{/if}
