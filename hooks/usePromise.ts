import { useEffect, useState } from "react"
import { getBookFromId } from "../data/book";

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

export const useBook = (id: string) => usePromise(() => getBookFromId(id), [id]);