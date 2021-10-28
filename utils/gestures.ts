import { Rendition } from "epubjs";

export const addTapEmitter = (rendition: Rendition, maxMove: number=10, maxDuration: number=200) => {
    let down: MouseEvent = undefined;
    let startTime = undefined;
    let timeout = undefined;

    rendition.on('mousedown', (e: MouseEvent) => {
        if (timeout) clearTimeout();

        down = e;
        startTime = Date.now();
        timeout = setTimeout(() => {
            down = undefined;
            startTime = undefined;
            timeout = undefined;
        }, maxDuration);
    });

    rendition.on('mouseup', (e: MouseEvent) => {
        if (!startTime) return;

        const elapsed = Date.now() - startTime;
        if (elapsed > maxDuration) return;

        const distanceSquared = (e.screenX - down.screenX) ** 2 + (e.screenY - down.screenY) ** 2;
        if (distanceSquared > maxMove ** 2) return;

        rendition.emit('tap', e);
    });
}