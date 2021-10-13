import type { Rendition } from 'epubjs';
import { useCallback, useEffect, useRef, useState } from "react";
import { getBookProgress } from "../data/book";
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import ProgressBar from "./ProgressBar";
import StoreBookProgress from "./StoreBookProgress";


const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

interface Props {
    bookUrl: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useBook(props.bookUrl);
    const [rendition, setRendition] = useState<Rendition>(null);
    (window as any).rendition = rendition;
    (window as any).book = book;
    const nextPage = useCallback((e) => {
        if (!rendition) return;
        rendition.next();
    }, [rendition]);

    const progress = useBookPercentage(rendition);

    useEffect(() => {
        if (!rendition) return;

        const handler = (e: KeyboardEvent) => {
            if (!rendition) return;

            if (nextKeys.some(k => k === e.keyCode)) rendition.next();
            if (previousKeys.some(k => k ===e.keyCode)) rendition.prev();
        };
        window.addEventListener('keydown', handler);

        return () => window.removeEventListener('keydown', handler);
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