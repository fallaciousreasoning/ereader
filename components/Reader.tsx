import * as Epub from "epubjs/dist/epub"
import type { Book, Rendition } from 'epubjs';
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useBookPercentage from "../hooks/useBookPercentage";
import { time } from "../utils/time";
import { resolvable } from "../utils/resolvable";
import { getBookProgress, initializeLocations } from "../data/db";
import StoreBookProgress from "./StoreBookProgress";
import ProgressBar from "./ProgressBar";

(window as any).Epub = Epub;

const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

interface Props {
    bookUrl: string;
}

const prepareEbook = async (rendition: Rendition) => {
    await rendition.book.ready;
    
    initializeLocations(rendition.book);
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useMemo(() => process.browser ? new Epub.Book(props.bookUrl) : null, [props.bookUrl]) as Book;
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
        if (!book) return;
        
        const rendition = book.renderTo(bookElRef.current);
        setRendition(rendition);
        prepareEbook(rendition);

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