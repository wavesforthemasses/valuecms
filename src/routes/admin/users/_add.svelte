<script>
	import { Form, Input, Button } from '../../../ui/Form'
	import { functions } from '../../../stores/firebase'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher();
	let adding = false

	const addNew = (e) => {
		adding = true
		$functions.httpsCallable('addUser')({...e.detail}).then(result => {
			adding = false
			if(result && result.data && result.data.uid){
				dispatch("close")
			}else{
				// error
			}
    });
	}
</script>

{#if adding}
	Adding...
{:else}
	<Form on:save={addNew}>
		<Input name="name" label="Name" />
		<Input name="email" label="E-Mail" />
		<Button>Add</Button>
	</Form>
{/if}
