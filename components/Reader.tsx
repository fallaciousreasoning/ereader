import React, { useEffect, useRef, useState } from "react";
import useBookInteractions from '../hooks/useBookInteractions';
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import useRendition from '../hooks/useRendition';
import Chapters from "./ChapterList";
import Overlay from "./Overlay";
import ProgressBar from "./ProgressBar";
import StoreBookProgress from "./StoreBookProgress";

interface Props {
    id: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useBook(props.id);

    const rendition = useRendition(book, bookElRef);
    globalThis.rendition = rendition;
    globalThis.book = book;

    useBookInteractions(rendition, bookElRef);

    const progress = useBookPercentage(rendition);

    const [showOverlay, setShowOverlay] = useState(false);
    useEffect(() => {
        if (!rendition) return;

        // TODO: Show the overlay when the center is tapped.
        rendition.on('keyup', (e: KeyboardEvent) => e.key == "Enter" && setShowOverlay(open => !open));
    }, [rendition]);
    return <div className="w-screen h-screen">
        <StoreBookProgress rendition={rendition} />
        <div className="pointer-events-none top-0 absolute left-0 right-0">
            <ProgressBar progress={progress} />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <Overlay open={showOverlay} setOpen={setShowOverlay} dismissOnClick>
            <Chapters book={book} rendition={rendition}/>
        </Overlay>
        {/* <div className="absolute top-0 bottom-0 left-0 right-0" onClick={nextPage}>
        </div> */}
    </div>
}