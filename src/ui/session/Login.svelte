<script>
  import { user } from '../../stores/user'
	import { auth } from '../../stores/firebase'
	import { Form, Input, Button } from '../Form'
	let sending = false
	let sent = false
	let success = false

  const login = async (e) => {
		sending = true
    let promise = $auth.signInWithEmailAndPassword(e.detail.email, e.detail.password)

    promise
      .then(data => {
				//console.log('finished logging in:', data)
				sending = false
				sent = true
				success = true
			})
      .catch(e => {
				//console.error(e)
				sending = false
				sent = true
				success = false
			})

    return promise;
  }
</script>

<style>
	.login{
    @mixins: p(6) w(full);
	}
	.login :global(form){
    @mixins: w(full);
	}
	.login :global(input), .login :global(textarea){
		@apply appearance-none block bg-gray-400 text-black leading-tight;
    @mixins: relative() py(3) px(4) mb(3) w(full) rounded(2);
	}
	.login :global(.btn){
		@apply bg-secondary uppercase block;
    @mixins: mt(6) mx(auto) rounded(full) font(body, bold);
	}
	.login :global(.btn:hover){
		@apply bg-primary;
	}
	.tryagain{
		@apply text-primary;
    @mixins: font(900);
    cursor: pointer;
	}
</style>

{#if success}
	You logged in successfully!
	<br />Now you can close this box and navigate to the website.
{:else}
	{#if sent}
		Your email or password are incorrect, <span class="tryagain" on:click={() => sent = false}>try again</span>
	{:else}
		{#if sending}
			Process started...
		{:else}
			<div class="login">
				<Form on:save={login}>
					<Input name="email" label="E-Mail" />
					<Input name="password" label="Password" type="password" />
					<Button>Log In</Button>
				</Form>
			</div>
		{/if}
	{/if}
{/if}
