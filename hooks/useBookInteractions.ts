import { Rendition } from "epubjs";
import React, { useEffect } from "react";
import { Direction } from "../utils/gestures";

const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

export default function useBookInteractions(rendition: Rendition, bookElRef: React.MutableRefObject<HTMLDivElement>) {
    useEffect(() => {
        if (!rendition) return;

        const keyboardHandler = (e: KeyboardEvent) => {
            if (nextKeys.some(k => k === e.keyCode)) rendition.next();
            if (previousKeys.some(k => k === e.keyCode)) rendition.prev();
        };

        const mouseHandler = (e: MouseEvent) => {
            const bookBounds = bookElRef.current?.getBoundingClientRect();
            if (!bookBounds) return;

            const x = e.screenX - window.screenX;

            // If the click is on the left side, go back. Otherwise go forward.
            if (x < bookBounds.x + bookBounds.width / 2)
                rendition.prev();
            else rendition.next();
        };

        const swipeHandler = (e: { direction: Direction}) => {
            if (e.direction == Direction.Left) rendition.next();
            if (e.direction == Direction.Right) rendition.prev();
        }

        rendition.on('keyup', keyboardHandler);
        rendition.on('tap', mouseHandler);
        rendition.on('swipe', swipeHandler);
        return () => {
            rendition.off('keyup', keyboardHandler);
            rendition.off('tap', mouseHandler);
            rendition.off('swipe', swipeHandler);
        };
    }, [rendition]);
}