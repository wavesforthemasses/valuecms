<script>
  import { user } from '../../stores/user'
  import { auth } from '../../stores/firebase'
  $auth.signOut()
  user.loggedOut()
</script>

You have been logged out
