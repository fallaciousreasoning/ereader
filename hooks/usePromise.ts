import { useEffect, useState } from "react"
import { getBookFromSource } from "../data/book";

export const usePromise = <T>(promise: Promise<T> | (() => Promise<T>), dependencies: any[], defaultValue: T = undefined) => {
    const [state, setState] = useState<T>(defaultValue);
    useEffect(() => {
        let cancelled = false;
        const p = typeof promise === "function" ? promise() : promise;
        p.then(result => setState(result));

        return () => cancelled = true;
    }, dependencies);

    return state;
}

export const useBook = (source: string) => usePromise(() => getBookFromSource(source), [source]);