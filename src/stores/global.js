import { writable } from 'svelte/store';

export const scrollY = writable(0)
export const windowHeight = writable(0)
export const path = writable(null)

const menuStore = () => {
	const { subscribe, set, update } = writable({main: null, sub: null});

	return {
		subscribe,
		open: (me) => set({main: me, sub: null}),
    openSub: (me) => update(n => { return {...n, sub: me}}),
    close: () => set({main: null, sub: null}),
    closeSub: () => update(n => { return {...n, sub: null}}),
	};
}
export const menu = menuStore()
