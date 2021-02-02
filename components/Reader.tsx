import * as Epub from "epubjs/dist/epub"
import type { Book, Rendition } from 'epubjs';
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useBookProgress from "../hooks/useBookProgress";
import { time } from "../utils/time";
import { resolvable } from "../utils/resolvable";

(window as any).Epub = Epub;

const nextKeys = [68, 39, 32, 40];
const previousKeys = [65, 37, 38];

interface Props {
    bookUrl: string;

    cfi?: string;
}

const prepareEbook = async (rendition: Rendition) => {
    await rendition.book.ready;
    const locations = await rendition.book.locations.generate(1600);
    
    const json = time('Serializing locations', () => JSON.stringify(locations));
    const deserialized = time("Deserializing locations", () => JSON.parse(json));
    console.log(json)
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useMemo(() => process.browser ? new Epub.Book(props.bookUrl) : null, [props.bookUrl]) as Book;
    const [rendition, setRendition] = useState<Rendition>(null);
    (window as any).rendition = rendition;
    (window as any).book = book;
    const nextPage = useCallback((e) => {
        if (!rendition) return;
        // e.stopPropagation();
        rendition.next();
    }, [rendition]);

    const progress = useBookProgress(rendition);

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
        prepareEbook(rendition);

        rendition.display(props.cfi);

        console.log(bookElRef.current.querySelector('iframe'));
    }, [book])
    return <div className="w-screen h-screen bg-red-800">
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" onClick={nextPage}>
            Progress: {progress}
        </div>
    </div>
}