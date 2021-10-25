import type { Rendition } from 'epubjs';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getBookProgress } from "../data/book";
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import ProgressBar from "./ProgressBar";
import StoreBookProgress from "./StoreBookProgress";


const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

interface Props {
    id: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useBook(props.id);
    const [rendition, setRendition] = useState<Rendition>(null);
    globalThis.rendition = rendition;
    globalThis.book = book;
    const nextPage = useCallback((e: React.MouseEvent) => {
        if (!rendition) return;

        const bookBounds = bookElRef.current?.getBoundingClientRect();
        if (!bookBounds) return;

        // If the click is on the left side, go back. Otherwise go forward.
        if (e.clientX < bookBounds.x + bookBounds.width/2)
            rendition.prev();
        else rendition.next();
    }, [rendition]);

    const progress = useBookPercentage(rendition);

    useEffect(() => {
        if (!rendition) return;

        const handler = (e: KeyboardEvent) => {
            if (!rendition) return;

            if (nextKeys.some(k => k === e.keyCode)) rendition.next();
            if (previousKeys.some(k => k ===e.keyCode)) rendition.prev();
        };
        globalThis.addEventListener('keydown', handler);

        return () => globalThis.removeEventListener('keydown', handler);
    }, [rendition])

    useEffect(() => {
        if (!book || !bookElRef.current) return;
        
        const rendition = book.renderTo(bookElRef.current);
        setRendition(rendition);
        getBookProgress(book).then(cfi => rendition.display(cfi));
    }, [book])
    return <div className="w-screen h-screen">
        <StoreBookProgress rendition={rendition}/>
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" onClick={nextPage}>
            <ProgressBar progress={progress}/>
        </div>
    </div>
}