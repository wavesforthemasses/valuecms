<script>
  import { onMount } from 'svelte'
  import { Section } from '../../ui/Section'
  import { Button } from '../../ui/Form'
  import { Pie } from '../../ui/Chart'
  let data = {a: 9, b: 20, c:30, d:8, e:12}
  const newdata = () => {
    data = Object.keys(data).reduce((a, key) => {
      a[key] = Math.floor(Math.random() * 50)
      return a
    }, {})
  }
</script>

<style>
  .col{
    @apply block border-primary text-black;
    @mixins: p(4) b();
  }
  .chart{
    @mixins: b(0) flex(center);
  }
  h3{
    @mixins: font(bold);
  }
</style>

<Section>
  <h1>Admin Dashboard</h1>
  <h3>Manage your website</h3>
</Section>

<Section cols={2}>
  <div class="col">
    <h2>Users</h2>
    <p>You can add new users, edit the existing ones or even delete them</p>
    <Button href="/admin/users">Go</Button>
  </div>
  <div class="col chart">
    <Pie {data} />
    <div on:click={newdata}>new</div>
  </div>
</Section>
