<script>
  import { onMount } from 'svelte';
  import { onVisible } from '../../utils/visible'
  export let address = ""
  let loadMe = false
  let src = null
  let f
  let loaded = false
  onMount(() => {
    f.onload = () => loaded = true
  })
  $: if(loadMe && address) src = `https://maps.google.com/maps?width=1920&height=400&hl=it&q=${encodeURI(address)}&ie=UTF8&t=&z=16&iwloc=B&output=embed`
</script>

<style>
  .map{
    @apply bg-gray-200;
    @mixins: relative() w(full) bg(cover);
  }
  iframe{
    @mixins: b(0) m(0) w(full) h(64);
    overflow: hidden;
    pointer-events:none;
    -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
         -o-filter: grayscale(100%);
            filter: grayscale(100%);
  }
</style>
<div class="map" use:onVisible={{start: 'start', cb: () => loadMe = true}} style={`background-image: url('loading.gif'); background-size: 1.5rem;`}>
  <iframe {src} title="Il nostro indirizzo è Via Marchese di Villabianca 70, Palermo - Italia" bind:this={f}></iframe>
</div>
