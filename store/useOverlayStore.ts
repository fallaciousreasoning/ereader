import useStore, { createStore } from "./useStore";

type Overlays = 'none' | 'menu' | 'wordlookup';

createStore('overlays', 'none');
export default function useOverlayStore() {
    return useStore<Overlays>('overlay');
} 