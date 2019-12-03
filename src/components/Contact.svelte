<script>
  import { Form, Input, Button, Textarea } from "../ui/Form"
  let sending = false
  let done = false

  const submit = async (e) => {
    sending = true
    const message = `Name: ${e.detail.name}\n
                     E-Mail: ${e.detail.email}\n
                     Phone: ${e.detail.phone}\n
                     Message: ${e.detail.message}`
    fetch('/sendMail', {
      method: 'POST',
      body: JSON.stringify({from: e.detail.email, name: e.detail.name, txt: message}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => {
      sending = false
      done = true
    })
    .catch(err => {
      sending = false
    })
  }
</script>

<style>
  .contact{
    @apply text-black;
    @mixins: flex(col, center) p(6) w(full) min-h(screen);
    background-image: linear-gradient(45deg, #e9e9e9, #f9f9f9);
  }
  .contact :global(.btn){
    @apply bg-secondary uppercase block;
    @mixins: mt(6) mx(auto) font(body, bold);
  }
  .contact :global(.btn:hover){
    @apply bg-primary;
  }
  h2, h3{
    @apply text-center;
    @mixins: mt(0) mb(2);
  }
  h2{
    @mixins: font(2xl);
  }
  h3{
    @mixins: font(lg);
  }
  @screen md {
    h2{
      @mixins: font(4xl);
    }
    h3{
      @mixins: font(2xl);
    }
  }
</style>

<div class="contact">
{#if done}
  <h2>Thanks!</h2>
  <h3>We'll contact you asap</h3>
{:else}
  {#if sending}
    <h3>Sending..</h3>
  {:else}
    <h2>Contacts us</h2>
    <h3>+1 123 456 78</h3>
    <Form on:save={submit}>
      <Input name="name" label="Name" />
      <Input name="email" label="E-Mail" />
      <Input name="phone" label="Phone" />
      <Textarea name="message" label="Message" />
      <Button pulse={true}>Send</Button>
    </Form>
  {/if}
{/if}
</div>
