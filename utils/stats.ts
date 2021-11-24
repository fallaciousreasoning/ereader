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
    const center = Math.floor(items.length/2);

    const result: T[] = [];
    for (let i = 0; i < Math.floor(n/2); ++i) {
        const low = center - i;
        const high = center + i;

        // First iteration, both are zero. This should pick the middle item (if odd), or the left hand center item (if even).
        if (low !== high && high < items.length) {
            result.push(items[high]);
        }

        // Otherwise, we grow evenly, biased one towards the left.
        if (low >= 0)
            result.push(items[low]);
    }

    // If we need one more item (because the center rounded down), push the next right hand item.
    const lastRight = center + Math.ceil(n/2);
    if (result.length < n && lastRight < items.length)
        result.push(items[lastRight]);
    return result;
}

globalThis.middleN = middleN;