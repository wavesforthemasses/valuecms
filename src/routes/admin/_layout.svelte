<script>
  import { user, has, checkingUserStatus } from '../../stores/user'
  import { Loading } from '../../ui/Loading'
  import { Section } from '../../ui/Section'
</script>

<Loading if={$checkingUserStatus}>Wait...</Loading>
{#if $has.role('admin')}
  <slot />
{:else}
  <Section>Access denied!</Section>
{/if}
