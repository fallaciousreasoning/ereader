export const median = (items: number[]) => {
    // A sorted copy.
    items = [...items].sort();

    if (items.length % 2 == 0)
        return items[items.length/2];

    const left = items[Math.floor(items.length/2)];
    const right = items[Math.ceil(items.length/2)];
    return (left + right) / 2;
}

export const middleN = <T>(items: T[], n: number) => {
    const start = Math.max(0, Math.floor(items.length/2) - Math.floor(n/2));

    const result: T[] = [];
    for (let i = start; i < start + n; ++i) {
        if (i >= items.length) break;
        result.push(items[i]);
    }
    return result;
}

globalThis.middleN = middleN;