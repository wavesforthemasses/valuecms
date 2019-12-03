<script>
  import { fade } from 'svelte/transition';
  import { menu, path } from '../stores/global';
  import { can } from '../stores/user'
  import Contact from '../components/Contact.svelte';
  $: if($path) menu.close()

</script>

<div
  class="sidenav"
  class:sidenav-open={$menu.main == "contacts"}>
  <div class="sidenav-close-button" aria-label="Close" on:click={menu.close}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
  </div>
  <div class="sidenav-inner">
    <Contact />
  </div>
  <div
    class="nav-shadow"
    on:click={menu.close}></div>
</div>

<div class="menulinks" class:open={$menu.main == "nav"} class:close={$menu.main != "nav"}>
  <div class="layer">
  {#if $menu.main == "nav"}
    <div class="sidenav-close-button" aria-label="Close" on:click={menu.close}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
    </div>
    <ul class="links" in:fade={{delay: 300}}>
      <li><a href="/">Home</a></li>
      <li><a href="/about/">About</a></li>
      {#if $can.do('logout')}
        {#if $can.do('access', 'admin_dashboard')}
          <li><a href="/admin">Admin</a></li>
        {/if}
        <li on:click={() => menu.open('logout')}><span>Logout</span></li>
      {:else}
        <li on:click={() => menu.open('login')}><span>Login</span></li>
      {/if}
    </ul>
  {/if}
  </div>
  {#if $menu.main != "nav"}
    <div class="circleBTN" in:fade={{delay: 500}} aria-label="Open Menu" on:click={() => menu.open('nav')}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </div>
  {:else}
    <div
      class="circle-shadow"
      in:fade={{delay: 100}}
      on:click={menu.close}></div>
  {/if}
</div>

<style>
  .sidenav{
    @apply text-black bg-white;
    @mixins: full(y) fixed() z(50);
    overflow-x: hidden;
    overflow-y: auto;
  }
  .sidenav{
    @mixins: max-w(0);
    transition: max-width 0.5s ease-in-out;
    background-image: linear-gradient(45deg, #e9e9e9, #f9f9f9);
  }
  .sidenav-close-button{
    @mixins: p(3) absolute(top, right);
  }
  .sidenav-open{
    @mixins: max-w(screen);
    transition: max-width 0.5s ease-in-out;
  }
  .sidenav-inner{
    @apply opacity-0;
    @mixins: flex() place-items(center) hw(screen) p(4);
    transition: all 0.5s ease-in-out;
  }
  .sidenav-open .sidenav-inner{
    @apply opacity-100;
    @mixins: ml(0);
    transition: all 0.5s ease-in-out;
  }
  .nav-shadow{
    @apply opacity-0;
    @mixins: fixed(full) hw(0) z(40);
    background: linear-gradient(to right,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0) inset;
    transition: opacity 0.5s ease-in-out, width 0s 1s, height 0s 1s, left 0.5s ease-in-out, box-shadow 0.5s 0.5s ease-in-out;
  }
  .sidenav-open .nav-shadow{
    @apply opacity-100;
    @mixins: hw(full) min-h(screen) left(100vw);
    box-shadow: 3px 0px 25px rgba(0, 0, 0, 0.15) inset;
    transition: opacity 0.5s 0.5s ease-in-out, left 0s ease-in-out, box-shadow 0.5s 1s ease-in-out;
  }

  svg{
    @mixins: hw(6);
  }

  .menulinks .circleBTN{
    @apply bg-secondary text-white cursor-pointer;
    @mixins: flex() h(full) mr(4) mb(12) p(3) rounded(full);
  }
  .menulinks .circleBTN svg{
    @apply fill-current;
  }
  .menulinks{
    @apply block;
    @mixins: fixed(bottom, right);
  }

  .menulinks .layer{
    @apply block bg-secondary text-white;
    @mixins: fixed(bottom, right) z(50) hw(0);
    transition: all 0.5s 0s ease-in-out, margin 0.5s 0.5s, border-radius 0.5s 1s;
  }

  .menulinks.open{
    @mixins: full();
  }

  .menulinks.open .layer{
    @mixins: p(4) rounded-tl(full);
    transition: all 0.5s 0.05s ease-in-out, margin 0.05s 0s, border-radius 0.05s 0s;
  }

  .circle-shadow{
    @apply opacity-100;
    @mixins: hw(full) min-h(screen);
    background-image: radial-gradient(circle at bottom right, #000, #0006);
    transition: all 0.5s 1s ease-in-out;
  }

  .menulinks ul{
    @apply text-right;
    @mixins: absolute(bottom, right) m(4);
  }

  .menulinks li{
    @mixins: font(xl);
  }

  @screen portrait {
    .menulinks.open .layer{ @mixins: h(60vh) w(screen); }
  }

  @screen landscape {
    .menulinks.open .layer{ @mixins: h(screen) w(60vw); }
  }

  %navWidth($w){
    .sidenav-open{ @mixins: max-w($w); }
    .sidenav-inner{ @mixins: w($w) ml(-$w); }
    .sidenav-open .nav-shadow{ @mixins: left($w); }
  }%

  @screen md {
    .menulinks { @apply hidden; }
    @mixins: navWidth(50vw);
  }
  @screen lg {
    @mixins: navWidth(35vw);
  }
  @screen xl {
    @mixins: navWidth(25vw);
  }
</style>
