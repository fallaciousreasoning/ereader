import { Rendition } from "epubjs";
import React, { useEffect, useState } from "react";
import useOverlayStore from "../store/useOverlayStore";
import useWordLookup from "../store/useWordLookup";
import { Direction } from "../utils/gestures";
import { contains } from "../utils/rect";
import { useHighlighted, useHighlightedWord } from "./useInteractions";

type TapZones = { previous: React.MutableRefObject<HTMLDivElement>, next: React.MutableRefObject<HTMLDivElement>, menu: React.MutableRefObject<HTMLDivElement> };

const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

export default function useBookInteractions(rendition: Rendition, zones: TapZones) {
    const [, setOverlay] = useOverlayStore();
    const [, setWordLookup] = useWordLookup();
    const highlightedWord = useHighlightedWord(rendition);

    useEffect(() => {
        if (highlightedWord) setWordLookup(highlightedWord);
    }, [highlightedWord, setWordLookup]);

    useEffect(() => {
        if (!rendition) return;

        const keyboardHandler = (e: KeyboardEvent) => {
            if (nextKeys.some(k => k === e.keyCode)) rendition.next();
            if (previousKeys.some(k => k === e.keyCode)) rendition.prev();
        };

        const mouseHandler = (e: MouseEvent) => {
            const point = { x: e.screenX, y: e.screenY };

            const previousBounds = zones.previous?.current?.getBoundingClientRect();
            if (contains(previousBounds, point)) {
                rendition.prev();
                return;
            }

            const nextBounds = zones.next?.current?.getBoundingClientRect();
            if (contains(nextBounds, point)) {
                rendition.next();
                return;
            }

            const menuBounds = zones.menu?.current?.getBoundingClientRect();
            if (contains(menuBounds, point)) {
                setOverlay('menu');
                return;
            }
        };

        const swipeHandler = (e: { direction: Direction }) => {
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
    }, [rendition, setOverlay]);
}