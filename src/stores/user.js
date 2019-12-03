import { writable, derived } from 'svelte/store';

const userStore = () => {
	const { subscribe, set } = writable('checkingUserStatus');

	return {
		subscribe,
		loggedIn: (user) => set(user),
		loggedOut: () => set(null)
	};
}

export const user = userStore()

const loggedIn = u => u != 'checkingUserStatus' && u !== null
const hasRole = (u, r) => loggedIn(u) && u.claims && !!u.claims[r]

const permissionsStore = () => {
	const { subscribe, set, update } = writable({
		login: {default: u => u === null},
		logout: {default: loggedIn},
		access: {default: (params) => true, admin_dashboard: u => loggedIn(u) && hasRole(u, 'admin')}
	});

	return {
		subscribe,
		addAction: (action, validation) => update(all => action in all ? all : {...all, [action]: {default: validation}}),
		addRule: (action, rule, validation) => update(all => action in all
			? {...all, [action]: {...all[action], [rule]: validation}}
			: {...all, [action]: {[rule]: validation, default: (params) => false}})
	};
}

export const permissions = permissionsStore()

export const can = derived(
  [user, permissions],
  ([$user, $permissions]) => {
		return {
			do(...params){
				let [action, section] = params
				if(!action) return false
				if(!section) section = 'default'
				return action in $permissions && section in $permissions[action] && $permissions[action][section]($user)
			}
		}
	}
)

export const has = derived(
  user,
  $user => {
		return {
			role(name){
				if(!name) return false
				if(name == 'auth') return loggedIn($user)
				if(name == 'anon') return $user === null
				return loggedIn($user) && hasRole($user, name)
			}
		}
	}
)

export const checkingUserStatus = derived(
  user,
  $user => $user == 'checkingUserStatus'
)
