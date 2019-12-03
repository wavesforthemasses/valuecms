<script>
  import { onMount } from 'svelte'
  import { onVisible } from '../../utils/visible'
  import { fade } from 'svelte/transition';
  import { lazy } from '../../utils/visible'
  export let source = null
  export let sources = null
  export let thumb = null
  export let autoplay = false
  export let loop = false
  export let autoplayOnVisible = true
  export let preload = 'none'
  export let onEnd = false
  export let onPause = false

  let node
  let stopped = true
  if(!sources) sources = [{src: source, type: 'video/mp4'}]
  const autoplayActivate = (status, node) => {
    if(!autoplay){
      if(status){
        node.play().then(_ => {
          stopped = false
        }).catch(error => {
          //
        })
      }else{
        node.pause()
        stopped = true
      }
    }
  }

  const playVideo = () => {
    node.play()
    stopped = false
  }

  onMount(() => {
    node.loop = loop
    if(autoplay){
      node.muted = true
      node.play()
      stopped = false
    }
  })

  const videoEnded = () => {
    node.currentTime=0
    stopped = true
    if(onEnd) onEnd()
  }

  const videoPause = () => {
    node.pause()
    stopped = true
    if(onPause) onPause()
  }
</script>

<style>
  .video{
    @mixins: relative();
  }
  video{
    @mixins: bg(contain);
    cursor: pointer;
  }
  .play{
    @apply text-white;
    @mixins: absolute(full, flex) place-items(center) font(4xl);
    cursor: pointer;
  }
  .play>.btn{
    @apply text-center;
  }
</style>

<div class="video">
  {#if autoplayOnVisible}
    <video
      use:lazy="{{src: thumb}}"
      use:onVisible={{start: 'middle', stop: 'end', cb: autoplayActivate}}
      {preload}
      on:mouseenter={() => preload = 'auto'}
      on:ended={videoEnded}
      on:click={videoPause}
      bind:this={node}>
      {#each sources as source}
        <source {...source} >
      {/each}
    </video>
  {:else}
    <video
      use:lazy="{{src: thumb}}"
      {preload}
      on:mouseenter={() => preload = 'auto'}
      on:ended={videoEnded}
      on:click={videoPause}
      bind:this={node}>
      {#each sources as source}
        <source {...source} >
      {/each}
    </video>
  {/if}
  {#if stopped && !autoplay}
    <div class="play" on:click={playVideo} out:fade><span class="btn">&#9658;</span></div>
  {/if}
</div>
