export const propogateIFrameEvents = (root: HTMLElement, iframeSelector = "iframe", events = ['mousedown', 'mouseup', 'mousemove', 'click']) => {
    const frame = root.querySelector(iframeSelector) as HTMLIFrameElement;
    if (!frame) return;

    const reemit = (event: MouseEvent) => {
        const clientRect = frame.getBoundingClientRect();
        const toEmit = new MouseEvent(event.type, {
            ...event,
            clientX: event.clientX + clientRect.x,
            clientY: event.clientY + clientRect.y,
            bubbles: true,
        });

        frame.dispatchEvent(toEmit);
    }

    for  (const event of events)
        frame.contentWindow.addEventListener(event, reemit);
}