<script>
  import { goto } from '@sapper/app'
  export let to = null
  $: if(to) goto(to)
</script>
