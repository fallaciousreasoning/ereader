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

type Log = { type: string, detail?: string, timestamp?: number };
export const logs: Log[] = JSON.parse(globalThis.localStorage?.getItem('interactionlog') ?? null) ?? [];
const addLog = (log: Log) => {
    logs.push({ timestamp: Date.now(), ...log });
    globalThis.localStorage.setItem('interactionlog', JSON.stringify(logs));
}
export const clearLog = () => {
    logs.length = 0;
    globalThis.localStorage.setItem('interactionlog', JSON.stringify(logs));
}

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

            addLog({ type: e.type, detail: e.key });
        };

        const mouseHandler = (e: MouseEvent) => {
            const point = { x: e.screenX, y: e.screenY };
            addLog({ type: 'tap', detail: `x: ${e.x}, y: ${e.y}` });

            const previousBounds = zones.previous?.current?.getBoundingClientRect();
            addLog( { type: 'previousbounds', detail: JSON.stringify(previousBounds) });
            if (contains(previousBounds, point)) {
                addLog({ type: 'tapprev' });
                rendition.prev();
                return;
            }

            const nextBounds = zones.next?.current?.getBoundingClientRect();
            addLog( { type: 'nextbounds', detail: JSON.stringify(nextBounds) });
            if (contains(nextBounds, point)) {
                addLog({ type: 'tapnext' });
                rendition.next();
                return;
            }

            const menuBounds = zones.menu?.current?.getBoundingClientRect();
            addLog( { type: 'menubounds', detail: JSON.stringify(menuBounds) });
            if (contains(menuBounds, point)) {
                addLog({ type: 'tapmenu' });
                setOverlay('menu');
                return;
            }
        };

        const swipeHandler = (e: { direction: Direction }) => {
            addLog({ type: 'swipe', detail: e.direction });

            if (e.direction == Direction.Left) rendition.next();
            if (e.direction == Direction.Right) rendition.prev();
        }

        const logger = (e) => {
            addLog({ type: e.type, detail: `x: ${e.screenX}, y: ${e.screenY}` });
        }

        rendition.on('mousedown', logger);
        rendition.on('mouseup', logger);

        rendition.on('keyup', keyboardHandler);
        rendition.on('tap', mouseHandler);
        rendition.on('swipe', swipeHandler);
        return () => {
            rendition.off('mousedown', logger);
            rendition.off('mouseup', logger);
            rendition.off('keyup', keyboardHandler);
            rendition.off('tap', mouseHandler);
            rendition.off('swipe', swipeHandler);
        };
    }, [rendition, setOverlay]);
}