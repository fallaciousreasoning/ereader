import { Rendition } from "epubjs";
import { useEffect, useState } from "react";

export const useHighlighted = (rendition: Rendition) => {
    const [highlight, setHighlighted] = useState('');

    useEffect(() => {
        if (!rendition) return;

        const handler = () => {
            const manager = (rendition as any).manager;
            const selection = (manager && manager.getContents().length > 0) ? manager.getContents()[0].window.getSelection().toString().trim() : "";
            setHighlighted(selection);
        };

        rendition.on('selected', handler);

        return () => rendition.off('selected', handler);
    });

    return highlight;
}

export const useHighlightedWord = (rendition: Rendition) => {
    const highlight = useHighlighted(rendition);
    if (!highlight || highlight.includes(' '))
        return '';

    return highlight;
}