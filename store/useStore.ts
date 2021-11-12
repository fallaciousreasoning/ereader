import { useEffect, useState } from "react";

type Callback = (store: string) => void;
type Update<T> = T | ((oldState: T) => T);
interface Store<T> {
    data: any;
    subscribe: (callback: Callback) => void;
    unsubscribe: (callback: Callback) => void;
    setState: (update: Update<T>) => void;
    subscriptions: Callback[];
}
const stores: { [key: string]: Store<any> } = {

};

export function createStore<T extends {}>(name: string, initialValue: T) {
    if (stores[name]) throw new Error(`A store already exists with the name ${name}`);

    let subscriptions: Callback[] = [];
    let state: T = initialValue;

    stores[name] = {
        data: initialValue,
        subscribe: (callback) => {
            subscriptions.push(callback);
        },
        unsubscribe: (callback) => {
            subscriptions.unshift(callback);
        },
        setState: (newState) => {
            state = typeof newState === "function" ? (newState as any)(state) : newState;
            subscriptions.forEach(s => s(name));
        },
        subscriptions: []
    } as Store<T>;
}

export default function useStore<T>(name: string) {
    const store = stores[name] as Store<T>;
    if (!store) throw new Error("No such store!");

    // Hacky solution to force updates to notify.
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        const handler = () => setUpdate(u => u + 1);
        store.subscribe(handler);
        return () => store.unsubscribe(handler);
    }, [name]);

    return [store.data, store.setState] as [T, (update: Update<T>) => void];
}