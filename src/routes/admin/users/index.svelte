<script>
  import { Section } from '../../../ui/Section'
  import { Modal } from '../../../ui/Modal'
  import { db, functions } from '../../../stores/firebase'
  import Add from './_add.svelte'
	let users = []
  let add = false
	$db.collection('users').onSnapshot(querySnapshot => {
		querySnapshot.docChanges().forEach(change => {
			if(change.type == 'added') users = [change.doc, ...users]
			if(change.type == 'modified') users = users.map(user => user.id != change.doc.id ? user : change.doc)
			if(change.type == 'removed') users = users.filter(user => user.id != change.doc.id)
		})
	})
</script>

<style>
  .col{
    @apply bg-primary-darker text-secondary-lighter;
    @mixins: p(4) flex();
  }
  .col>.left{
    @mixins: relative() w(20);
  }
  .col>.right{
    @mixins: pl(4) w(3/4);
  }
  .col>.left>.image{
    @apply block bg-secondary-darker border-secondary-lighter;
    @mixins: mx(auto) b() hw(16) rounded(full);
  }
  .col>.right>.name{
    @mixins: font(bold);
  }
  .col>.right>.ruolo{
    @mixins: font(italic);
  }
  .col:hover{
    @apply text-white;
  }
  .col:hover .image{
    @apply border-white;
  }
  h3{
    @mixins: font(bold);
  }
  .add{
    @apply text-white bg-primary-darker leading-none;
    @mixins: flex() place-items(center) hw(10) rounded(full) font(bold, 2xl);
    cursor: pointer;
  }
</style>

<Section>
  <div on:click={() => add = true} class="add">+</div>
</Section>

<Section cols={4}>
  {#if users}
    {#each users as user (user.id)}
      <a href={`/admin/users/edit/${user.id}`} class="col">
        <span class="left">
          <span class="image">&nbsp;</span>
        </span>
        <span class="right">
          <h4 class="name">{user.data().name}</h4>
          <span class="ruolo">Lorem ipsum</span>
        </span>
      </a>
    {/each}
  {/if}
</Section>

<Modal open={add} on:close={() => add = false}><Add on:close={() => add = false} /></Modal>
