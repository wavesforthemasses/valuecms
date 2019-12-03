import { writable } from 'svelte/store';
import fireDB from '../firebase/firestore.js';
import fireFUNCT from '../firebase/functions.js';
import fireAUTH from '../firebase/auth.js';
import {user} from './user.js';

export const db = writable(fireDB)
export const functions = writable(fireFUNCT)

const authStore = () => {
	const { subscribe, set } = writable(fireAUTH);
  if(process.browser === true) window.onload = e => fireAUTH.onAuthStateChanged(u => u
		? u.getIdTokenResult().then((idTokenResult) => user.loggedIn({...u, claims: idTokenResult.claims})).catch((error) => console.log(error))
		: user.loggedOut());
	return { subscribe }
}

export const auth = authStore()
