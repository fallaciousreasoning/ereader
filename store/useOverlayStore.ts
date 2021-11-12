import useStore, { createStore } from "./useStore";

type Overlays = 'none' | 'menu' | 'wordlookup';

createStore('overlay', 'none');
export default function useOverlayStore() {
    return useStore<Overlays>('overlay');
} 