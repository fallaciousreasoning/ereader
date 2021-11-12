import { useCallback } from "react";
import useOverlayStore from "./useOverlayStore";
import useStore, { createStore } from "./useStore";

createStore('wordlookup', '');
export default function useWordLookup() {
    const [overlay, setOverlay] = useOverlayStore();
    const [wordLookup, setWordLookup] = useStore<string>('wordlookup');
    const setter = useCallback((word: string) => {
        setOverlay('wordlookup');
        setWordLookup(word);
    }, [setWordLookup, setOverlay]);
    return [wordLookup, setter] as const
}