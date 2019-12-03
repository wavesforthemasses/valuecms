<script>

export let pulse = false
export let label = "Click me";
export let href = false
export let styled = true;

</script>

<style>
	.btn{
		@apply fill-current text-white inline-block;
	}
	.btn.styled{
		@apply bg-primary border-primary;
		@mixins: py(1) px(3) b() rounded(4);
	}
	.btn.styled:hover{
		@apply bg-white text-primary;
	}
	button {
		outline: none;
		cursor: pointer;
	}
	.pulse{
	  overflow:visible;
		@mixins: z(10) relative();
	}
	.pulse::before{
	  content: '';
	  display:block;
	  background-color:inherit;
	  border-radius:inherit;
	  transition:opacity .3s, transform .3s;
	  animation:pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;
	  @mixins: z(-1) absolute(top, left) hw(full);
	}
	@keyframes pulse-animation{
	  0%{
	    opacity:1;
	    transform:scale(1)
	  }
	  50%{
	    opacity:0;
	    transform:scale(1.5)
	  }
	  100%{
	    opacity:0;
	    transform:scale(1.5)
	  }
	}
</style>

{#if href}
	<a href={href}
					class="btn"
					class:pulse
					class:styled
					on:click>
		<slot />
	</a>
{:else}
	<button type="submit"
					class="btn"
					class:pulse
					class:styled
					aria-label={label}
					on:click>
		<slot />
	</button>
{/if}
