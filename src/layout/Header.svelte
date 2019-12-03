<script>
  import Nav from './Nav.svelte'
  import { fly, fade } from "svelte/transition"
  import { scrollY, windowHeight, menu } from '../stores/global';
  import { user, can } from '../stores/user'
  import { Login, Logout } from '../ui/Session'
  import { Modal } from '../ui/Modal'

  const hideBefore = 0
  const fixedAfter = 0

  let isFixed = false
  $: if(isFixed == false) isFixed = $scrollY > fixedAfter
</script>

<style>
  .logo{
    @apply inline-flex;
    @mixins: hw(8) bg(contain);
    background-image: url('/favicon.png');
  }
  header{
    @apply border-primary;
    @mixins: top(0) left(0) w(full) bb() z(40);
  }
  .header-menu{
    @apply bg-white text-black;
    @mixins: flex() h(12) px(4);
  }
  .header-menu-inner{
    @mixins: mx(auto) flex(row, center, between);
  }
  svg{
    @apply text-secondary fill-current;
    @mixins: hw(6);
  }
  ul.links{
    @mixins: h(full);
  }
  ul.links li{
    @apply inline-block cursor-pointer inline-flex text-primary;
    @mixins: h(full) items(center) p(0) relative() z(1) font(head);
    overflow:hidden;
    background: none;
    box-sizing: content-box;
    transition:         0.08s ease-in;
    -o-transition:      0.08s ease-in;
    -ms-transition:     0.08s ease-in;
    -moz-transition:    0.08s ease-in;
    -webkit-transition: 0.08s ease-in;
  }
  ul.links li+li{
    @mixins: ml(0);
  }
  ul.links li>*{
    @apply text-primary;
    @mixins: h(full) flex() items(center) px(4);
  }
  ul.links li:hover *{
    @apply text-white;
  }
  ul.links li:before{
    content: "";
    @apply bg-primary;
    @mixins: absolute(bottom) full(x) z(-1) top(100%);
    -webkit-transition: top 0.09s ease-in;
  }

  ul.links li:hover:before {
    @mixins: top(0);
  }
  ul.links {
    @apply hidden;
  }
  .menucontacts{
    @mixins: h(full) flex(row, center);
  }
  @screen sm {
    ul.links{
      @apply block;
    }
  }
</style>

<svelte:window bind:scrollY={$scrollY} bind:innerHeight={$windowHeight} />

<header
  class:fixed={isFixed}
  in:fly={{y: -100}}
  out:fade>
  <Nav />
  <div class="header-menu">
    <div class="header-menu-inner container">
      <div class="menucontacts" on:click={() => menu.open('contacts')} aria-label="Contacts">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14l3.63-2.9z"/></svg>
      </div>
      <ul class="links">
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
      <a href="/" class="logo" aria-label="Homepage">&nbsp;</a>
    </div>
  </div>
</header>

<Modal open={$menu.main == "login"} on:close={menu.close}><Login /></Modal>
<Modal open={$menu.main == "logout"} on:close={menu.close}><Logout /></Modal>
