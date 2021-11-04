import { Book, Contents, Rendition } from "epubjs";
import React, { useEffect, useState } from "react";
import { getBookProgress } from "../data/book";
import { useTheme } from "../data/theme";
import { defaultTheme, getEpubStyles } from "../types/theme";
import { addSwipeEmitter, addTapEmitter } from "../utils/gestures";

export default function useRendition(book: Book, bookElRef: React.MutableRefObject<HTMLDivElement>) {
    const [rendition, setRendition] = useState<Rendition>(null);

    // const theme = useTheme();
    // useEffect(() => {
    //     if (!rendition) return;

    //     const rules = getEpubStyles(theme);
    //     const contents = rendition.getContents() as any as Contents[];
    //     for (const c of contents) {
    //         c.addStylesheetRules(rules, undefined);
    //     }
    // }, [theme, rendition]);

    useEffect(() => {
        if (!book || !bookElRef.current) return;

        const rendition = book.renderTo(bookElRef.current);
        setRendition(rendition);
        addTapEmitter(rendition);
        addSwipeEmitter(rendition);
        getBookProgress(book).then(async cfi => {
            await rendition.display(cfi);

            // Focus the frame so we get keyboard events.
            const frame = bookElRef.current.querySelector('iframe');
            frame.focus();
        });
    }, [book]);

    return rendition;
}