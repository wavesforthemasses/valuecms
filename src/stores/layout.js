//not working properly

import { writable, derived } from 'svelte/store';
import { path } from './global';

export const layoutPath = writable({"^/admin": 'admin'})
const layoutStore = () => {
	const { subscribe, set } = derived(
		[path, layoutPath],
		([$path, $layoutPath]) => {
			if(!$path) return null;
			const result = Object.keys($layoutPath).find(p => {
				const r = new RegExp(p);
				return r.test($path)
			});
			return result ? $layoutPath[result] : null
		}
	);

	return {
		subscribe,
		add: (np) => layoutPath.update(lp => { return {...lp, ...np}}),
	};
}

export const layout = layoutStore()
