<script>
  import { Button } from "../../ui/Form"
  import { createEventDispatcher } from 'svelte'
  import {fade, fly} from 'svelte/transition'
  import { path } from '../../stores/global';
  let prevPage = $path

  const changePage = (p) => {
    if(p !== prevPage){
      prevPage = p
      closeMe()
      return true
    }
  }
  $: changePage($path)

	const dispatch = createEventDispatcher();
  export let open = false

  $: if(open) openMe()

  const openMe = () => {
    dispatch("open")
    document.getElementsByTagName('body')[0].classList.add('modal-open');
  }

  const closeMe = () => {
    open = false
    dispatch("close")
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
  }
</script>

<style>
  :global(body.modal-open){
    overflow: hidden;
  }
  .modal-shadow{
    @mixins: fixed(full) z(9998) hw(screen);
    background: radial-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%);
  }

  .modal-wrapper{
    overflow-y: auto;
    @mixins: fixed(full) z(9997) flex() place-items(center) hw(screen);
  }

  .modal {
    @apply bg-white text-black;
    @mixins: z(9999) p(4) w(10/12) rounded(2);
    background-image: linear-gradient(45deg, #e9e9e9, #f9f9f9);
    max-height: 90vh;
    box-sizing: content-box;
	}

  .modal .content{
    @mixins: max-h(inherit);
    overflow: auto;
    box-sizing: border-box;
  }

  .modal :global(h3){
    @apply uppercase;
    @mixins: font(900, xl);
  }

  .close-button{
    @mixins: p(3) absolute(top, right) mr(4) mt(4);
  }

  .close-button :global(.btn){
    @apply text-white;
    @mixins: hw(8) font(head, bold);
  }

  @screen sm {
		.modal{
      @mixins: w(1/2);
		}
    .close-button :global(.btn){
      @mixins: hw(16);
    }
	}
</style>

{#if open}
  <div class="modal-wrapper">
    <div class="modal-shadow" on:click={closeMe} transition:fade={{duration: 500}}>
    </div>
    <div class="modal" transition:fly={{x: -1000, duration: 1000}}>
      <div class="content">
        <slot />
      </div>
      <div class="close-button"  transition:fade={{delay: 1000}}>
        <Button
          label="Close me"
          styled={false}
          on:click={closeMe}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
        </Button>
      </div>
    </div>
  </div>
{/if}
