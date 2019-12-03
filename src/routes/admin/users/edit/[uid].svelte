<script context="module">
	export async function preload(page, session) {
		const { uid } = page.params;
		return { uid };
	}
</script>
<script>
	export let uid;
	import { Section } from '../../../../ui/Section'
	import { db, functions } from '../../../../stores/firebase'
	import { user, has } from '../../../../stores/user'
	import { Button } from '../../../../ui/Form'
	import { goto } from '@sapper/app';
	let currentUser = null;
	let settingRole = false
	let removing = false
	$db.collection('users').doc(uid).onSnapshot(snapshot => currentUser = {id: snapshot.id, ...snapshot.data()})

	const setRole = (status) => {
		settingRole = true
		$functions.httpsCallable('setRole')({uid, role: 'admin', status}).then(result => {
			if(!currentUser.roles) currentUser.roles = {}
			currentUser.roles['admin'] = status
			settingRole = false
    });
	}

	const removeUser = () => {
		removing = true
		$db.collection('users').doc(uid).delete().then(result => {
			removing = false
			goto('/admin/users')
    });
	}

</script>

{#if currentUser}
<Section id="user-edit">
	<h1>{currentUser.name}</h1>
	{#if $has.role('admin')}
		{#if settingRole === true}
			<Button>Wait...</Button>
		{:else if !currentUser.roles || !currentUser.roles.admin}
			<Button on:click={() => setRole(true)}>Make Admin</Button>
		{:else if currentUser.id != $user.uid}
			<Button on:click={() => setRole(false)}>Remove Admin</Button>
		{/if}
		{#if removing === true}
			<Button>Deleting...</Button>
		{:else if !currentUser.roles || !currentUser.roles.admin}
			<Button on:click={removeUser}>Delete</Button>
		{/if}
	{/if}
</Section>
{/if}
