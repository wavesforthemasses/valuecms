<script>
  export let name;
  export let label = false;
  export let hint = false;
  export let placeholder = "";
	export let value = "";
</script>

<style>
  textarea{
    @apply block bg-gray-400 text-black leading-tight;
    @mixins: relative() py(3) px(4) mb(3) w(full) rounded(2);
    appearance: none;
  }
</style>

<div class="textarea-field">
  {#if label}
		<label
			for={name}
      class:active={value.length > 0}
		>{label}</label>
	{/if}

	<textarea
		id={name}
		name={name}
    class="focus:outline-none focus:bg-white focus:border-gray-500 cursor-text"
    placeholder={placeholder}
    on:input={(e) => {
      value = e.target.value
    }}
	>{value}</textarea>

  {#if hint}
		<p class="hint">{hint}</p>
	{/if}

  <slot />
</div>
