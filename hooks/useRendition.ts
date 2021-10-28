import { Book, Rendition } from "epubjs";
import React, { useEffect, useState } from "react";
import { getBookProgress } from "../data/book";
import { addSwipeEmitter, addTapEmitter } from "../utils/gestures";

export default function useRendition(book: Book, bookElRef: React.MutableRefObject<HTMLDivElement>) {
    const [rendition, setRendition] = useState<Rendition>(null);
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