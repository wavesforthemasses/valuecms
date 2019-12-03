<script>
  let c = null;
  let containerClasses = ['container']
	export { c as class };
  export let id = null;
  export let cols = 1;
  export let margin = 1;

  if(cols > 1) containerClasses = [...containerClasses, 'cols', `cols-${cols}`]
  if(cols > 1 && margin > 0) containerClasses = [...containerClasses, `space-${margin}`]

  $: cc = containerClasses.join(" ")
</script>

<style>
  section{
    @mixins: mt(10);
  }
  section>.container{
    @mixins: mx(auto);
  }
  section.small>.container{
    @mixins: w(10/12);
  }
  .cols {
    @mixins: flex();
    flex: wrap;
  }
  .cols :global(>.col){
    box-sizing: border-box; flex-basis: auto;
  }
  .cols-2 :global(>.col){ @mixins: w(1/2); }
  .cols-3 :global(>.col){ @mixins: w(1/3); }
  .cols-4 :global(>.col){ @mixins: w(1/4); }
  .space-1{ @mixins: m(-1); }
  .space-1 :global(>.col){ @mixins: m(1); }
  .space-2{ @mixins: m(-2); }
  .space-2 :global(>.col){ @mixins: m(2); }
  .space-3{ @mixins: m(-3); }
  .space-3 :global(>.col){ @mixins: m(3); }
  .space-4{ @mixins: m(-4); }
  .space-4 :global(>.col){ @mixins: m(4); }
  .space-5{ @mixins: m(-5); }
  .space-5 :global(>.col){ @mixins: m(5); }
  .space-6{ @mixins: m(-6); }
  .space-6 :global(>.col){ @mixins: m(6); }
  .space-8{ @mixins: m(-8); }
  .space-8 :global(>.col){ @mixins: m(8); }
  .space-10{ @mixins: m(-10); }
  .space-10 :global(>.col){ @mixins: m(10); }
  @screen md {
    section.small>.container{
      @mixins: w(2/3);
    }
  }
</style>

<section class={c} {id}>
  <div class={cc}>
    <slot />
  </div>
</section>
