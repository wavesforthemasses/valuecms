<script>
  import { elasticOut } from 'svelte/easing';
  import { getContext, onMount } from 'svelte';
  import { TheCarousel } from './../Carousel.js';
  import { onVisible } from '../../utils/visible'
  import { lazy } from '../../utils/images'

  export let bkg = null
  export let isFixed = false
  export let overlay = false
  export let overlayON = 'load'
  let overlayShow = false

  const { registerSlide, activeSlide } = getContext(TheCarousel);
  const id = registerSlide();

  let classes = ['carousel-slide']

  if(isFixed) classes = [...classes, 'fixed']
  classes = classes.join(" ")

  const slide = (node, {
    delay = 0,
  	duration = 400 }) => {
    node.classList.remove('overlay-active')
    overlayShow = false
    const o = +getComputedStyle(node).opacity;

  	return {
  		delay,
  		duration,
  		css: t => `opacity: ${t * o}`
  	};
	}

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  onMount(async () => {
    if($activeSlide === id && overlayON == 'load') overlayShow = true
  })

  const overlayOnVisible = (status, node) => {
    if(overlayON == 'visible') overlayShow = status
  }

</script>

<style>
  .carousel-slide{
    @mixins: absolute() bg(cover) h(full) w(full);
  }
  .carousel-slide.remove-placeholder .placeholder{
    transition: all 1s;
    opacity: 0;
  }
  .carousel-slide.overlay-active{
    @apply shadow-carousel;
    transition: box-shadow 0.5s ease-in-out .5s;
  }
  .carousel-slide .inner{
    @apply text-white text-center;
    @mixins: absolute(full) flex(col,center,center);
  }
  .carousel-slide .overlay{
    @apply bg-primary;
    @mixins: absolute(full);
    opacity: 0;
    clip-path: circle(0% at 90% 20%);
    transition: clip-path .5s, opacity .5s ease-in-out;
  }
  .carousel-slide.overlay-active .overlay{
    opacity: 0.75;
    clip-path: circle(100%);
    transition: clip-path .5s .5s, all .5s ease-in-out;
  }
  .carousel-slide .inner>*{
    opacity: 0;
    transition: all .5s .25s ease-in-out;
  }
  .carousel-slide.overlay-active .inner>*{ opacity: 1; }
  .carousel-slide :global(h1), .carousel-slide :global(h2){ @mixins: font(900, 2xl); }
  .carousel-slide :global(h3){
    @apply text-center;
    @mixins: w(11/12);
  }
  .carousel-slide :global(.description){
    @apply text-center;
    @mixins: font(base);
  }
  @screen md {
    .carousel-slide :global(h1), .carousel-slide :global(h2){ @mixins: font(4xl); }
    .carousel-slide :global(h3){ @mixins: w(1/2); }
    .fixed{ @mixins: bg(parallax); }
  }
</style>

{#if $activeSlide === id}
  <div
    class={classes}
    class:overlay-active={overlayShow}
    use:onVisible={{cb: overlayOnVisible}}
    use:lazy="{{src: bkg}}"
    on:mouseover={() => { if(overlayON == 'hover') overlayShow = true }}
    on:mouseout={() => { if(overlayON == 'hover') overlayShow = false }}
    in:slide|local={{duration: 1000}}
    out:slide|local={{duration: 1000}}>
    {#if bkg}
      <div class="placeholder" style={`background-image: url(g/${bkg}); background-repeat: no-repeat; background-size: cover; background-position: center; position: absolute; top: 0; bottom: 0; right: 0; left: 0; filter: blur(5px); transform: scale(1.05);`}></div>
    {/if}
    {#if overlay}
      <div class="overlay"></div>
    {/if}
    <div class="inner">
      <slot />
    </div>
  </div>
{/if}
