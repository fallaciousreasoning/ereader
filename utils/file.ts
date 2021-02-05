interface Options {
    accept: string[];
}

export const pickFile = async (options?: Options): Promise<File> => {
    options = { ...options };

    const input = document.createElement('input');
    input.setAttribute('type', 'file');

    const accept = options.accept.join(',');
    input.setAttribute('accept', accept);

    let resolvePromise;
    const promise = new Promise<File>((resolve) => {
        resolvePromise = resolve;
    });

    input.addEventListener('change', e => {
        const files: FileList = e.target['files'];
        resolvePromise(files[0]);
    });
    
    document.body.appendChild(input);
    input.click();
    input.remove();

    return promise;
}