import * as Epub from "epubjs/dist/epub"
import { useEffect, useMemo, useRef } from "react"
import dynamic from 'next/dynamic'

interface Props {
    bookUrl: string;
}

export default function Reader(props: Props) {
    const rootRef = useRef<HTMLDivElement>();
    const book = useMemo(() => process.browser ? new Epub.Book(props.bookUrl) : null, [props.bookUrl]);
    useEffect(() => {
        if (!book) return;
        
        const rendition = book.renderTo(rootRef.current);
        rendition.display();
    }, [book])
    return <div ref={rootRef} className="w-screen h-screen bg-red-800">

    </div>
}