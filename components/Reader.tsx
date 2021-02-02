import * as Epub from "epubjs/dist/epub"
import type { Book, Rendition } from 'epubjs';
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

interface Props {
    bookUrl: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useMemo(() => process.browser ? new Epub.Book(props.bookUrl) : null, [props.bookUrl]) as Book;
    const [rendition, setRendition] = useState<Rendition>(null);
    (window as any).rendition = rendition;
    const nextPage = useCallback(() => {
        if (!rendition) return;

        rendition.next();
    }, [rendition]);

    useEffect(() => {
        if (!rendition) return;

        const handler = (e: KeyboardEvent) => {
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
        rendition.display();
    }, [book])
    return <div className="w-screen h-screen bg-red-800">
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" onClick={nextPage} onKeyDown={console.log}>

        </div>
    </div>
}