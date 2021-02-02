export const time = <T>(description: string, action: () => T) => {
    const start = performance.now();
    const result = action();

    const log = () => console.log(`${description} took ${performance.now() - start}`);
    if (result instanceof Promise) {
        result.then(log);
    } else log();
    
    return result;
};