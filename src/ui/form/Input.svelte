<script>
  export let name;
  export let label = false;
  export let type = 'text';
  export let hint = false;
  export let placeholder = "";
	export let value = "";
  $: if(name == 'email') value = value.replace(/[^a-zA-Z0-9_\.\+\-\@]+/, "")
</script>

<style>
  input{
    @apply block bg-gray-400 text-black leading-tight;
    @mixins: relative() py(3) px(4) mb(3) w(full) rounded(2);
    appearance: none;
  }
</style>

<div class="input-field">
  {#if label}
		<label
			for={name}
      class:active={value.length > 0}
		>{label}</label>
	{/if}

	<input
		id={name}
		{name}
    {type}
		{value}
    class="focus:outline-none focus:bg-white focus:border-gray-500 cursor-text"
    placeholder={placeholder}
    on:input={(e) => {
      value = e.target.value
    }}
	/>

  {#if hint}
		<p class="hint">{hint}</p>
	{/if}

  <slot />
</div>
