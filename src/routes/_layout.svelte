<script>
  import Header from '../layout/Header.svelte'
  import Footer from '../layout/Footer.svelte'
  import { Loading } from '../ui/Loading'
  import { path } from '../stores/global';
  import { stores } from '@sapper/app';
  const { page } = stores();
  $: path.set($page.path)
  const width = "100"
</script>

<style>
  @font: Roboto:400,700;
  main{
    @apply text-black leading-relaxed;
    @mixins: relative() flex(1, col) justify(between) min-h(screen) max-w(full) font(body, base);
  }
  :global(p+p){
    @mixins: mt(4);
  }
  main :global(h1, h2, h3, h4, h5, h6){ @mixins: font(head); }
  main :global(h1, h2, h3){
    @apply uppercase;
    @mixins: font(bold);
  }
  main :global(h1){ @mixins: font(4xl); }
  main :global(h2){ @mixins: font(2xl); }
  main :global(h3){ @mixins: font(xl); }
  single{
    @apply flex-grow;
    @mixins: mb(16);
  }
</style>

<main>
  <Header />
  <single>
    <slot />
  </single>
  <Footer />
</main>
<Loading />
