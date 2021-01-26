import * as Epub from "epubjs/dist/epub"
import type { Book, Rendition } from 'epubjs';
import { useEffect, useMemo, useRef, useState } from "react"

interface Props {
    bookUrl: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useMemo(() => process.browser ? new Epub.Book(props.bookUrl) : null, [props.bookUrl]) as Book;
    const [rendition, setRendition] = useState<Rendition>(null);

    useEffect(() => {
        if (!book) return;
        
        const rendition = book.renderTo(bookElRef.current);
        setRendition(rendition);
        rendition.display();
    }, [book])
    return <div className="w-screen h-screen bg-red-800">
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" onClick={() => rendition && rendition.next()}>

        </div>
    </div>
}