import { Rendition } from "epubjs";
import React, { useEffect, useState } from "react";
import { estimateWords } from "../utils/estimateWords";

export const useWordsOnPage = (containerRef: React.MutableRefObject<HTMLDivElement>, rendition: Rendition) => {
    const [words, setWords] = useState(0);
    useEffect(() => {
        if (!containerRef.current || !rendition) return;

        const recalculate = () => {
            const container = containerRef.current.querySelector('.epub-container');
            const book = container?.querySelector('iframe')?.contentDocument?.body;
            if (!book || !container) {
                setWords(0);
                return;
            }

            const words = estimateWords(book, container);
            setWords(words);
        };

        rendition.on('locationChanged', recalculate);
        recalculate();

        return () => {
            rendition.off('locationChanged', recalculate);
        };
    }, [rendition, containerRef, containerRef.current]);

    return words;
}