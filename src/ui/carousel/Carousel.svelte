<script context="module">
	export const TheCarousel = {};
</script>

<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  let slides = 0;
  const activeSlide = writable(1);

  const nextSlide = () => activeSlide.update(c => c < slides ? c + 1 : 1)
  const prevSlide = () => activeSlide.update(c => c > 1 ? c - 1 : slides)

  setContext(TheCarousel, {
		registerSlide: () => slides += 1,
		activeSlide
	});

  export let height = "300px"
</script>

<style>
	.carousel{
		@apply bg-gray-700;
		@mixins: relative(flex) items(center) bg(cover);
		max-height: 66.6vw;
		overflow: hidden;
	}
  svg{
    @apply fill-current text-white inline-block;
		@mixins: hw(6);
  }
  .carousel-nav{
		@mixins: absolute() full(y) z(30) p(4);
  }
</style>

<div class="carousel" style={`height: ${height}; background-image: url('loading.gif'); background-size: 1.5rem;`}>
	{#if slides > 1}
	  <button class="carousel-nav left-0 focus:outline-none" on:click={prevSlide}>
	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"/></svg>
	  </button>
	  <button class="carousel-nav right-0 focus:outline-none" on:click={nextSlide}>
	    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
	  </button>
	{/if}
  <slot></slot>
</div>
