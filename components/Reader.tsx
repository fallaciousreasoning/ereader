import type { Rendition } from 'epubjs';
import React, { useEffect, useRef, useState } from "react";
import { getBookProgress } from "../data/book";
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import { addTapEmitter } from '../utils/gestures';
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

    const progress = useBookPercentage(rendition);

    useEffect(() => {
        if (!rendition) return;

        const keyboardHandler = (e: KeyboardEvent) => {
            if (nextKeys.some(k => k === e.keyCode)) rendition.next();
            if (previousKeys.some(k => k === e.keyCode)) rendition.prev();
        };

        const mouseHandler = (e: MouseEvent) => {
            const bookBounds = bookElRef.current?.getBoundingClientRect();
            if (!bookBounds) return;

            const x = e.screenX - window.screenX;
            const y = e.screenY - window.screenY;

            // If the click is on the left side, go back. Otherwise go forward.
            if (x < bookBounds.x + bookBounds.width / 2)
                rendition.prev();
            else rendition.next();
        };

        rendition.on('keyup', keyboardHandler);
        rendition.on('tap', mouseHandler);
        return () => {
            rendition.off('keyup', keyboardHandler);
            rendition.off('tap', mouseHandler);
        };
    }, [rendition])

    useEffect(() => {
        if (!book || !bookElRef.current) return;

        const rendition = book.renderTo(bookElRef.current);
        setRendition(rendition);
        addTapEmitter(rendition);
        getBookProgress(book).then(async cfi => {
            await rendition.display(cfi);

            // Focus the frame so we get keyboard events.
            const frame = bookElRef.current.querySelector('iframe');
            frame.focus();
        });
    }, [book]);

    return <div className="w-screen h-screen">
        <StoreBookProgress rendition={rendition} />
        <div className="pointer-events-none top-0 absolute left-0 right-0">
            <ProgressBar progress={progress} />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        {/* <div className="absolute top-0 bottom-0 left-0 right-0" onClick={nextPage}>
        </div> */}
    </div>
}