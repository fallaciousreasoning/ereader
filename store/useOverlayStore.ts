import useStore, { createStore } from "./useStore";

type Overlays = 'none' | 'menu' | 'wordlookup' | 'tapzones';

createStore('overlay', 'none');
export default function useOverlayStore() {
    return useStore<Overlays>('overlay');
} 