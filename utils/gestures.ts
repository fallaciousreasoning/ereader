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

export enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
};

export const addSwipeEmitter = (rendition: Rendition, minLength: number=100, maxDuration: number=500) => {
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
        if (distanceSquared < minLength ** 2) return;

        const dX = e.screenX - down.screenX;
        const dY = e.screenY - down.screenY;

        let direction = Direction.Up;
        if (Math.abs(dX) >= Math.abs(dY)) {
            direction = dX < 0 ? Direction.Left : Direction.Right;
        } else {
            direction = dY < 0 ? Direction.Up : Direction.Down;
        }

        console.log("Swiped", direction)
        rendition.emit('swipe', { direction });
    });
}