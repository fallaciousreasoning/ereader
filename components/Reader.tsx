import React, { useEffect, useRef, useState } from "react";
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import useRendition from '../hooks/useRendition';
import useOverlayStore from "../store/useOverlayStore";
import BookControls from "./BookControls";
import BookMenu from "./BookMenu";
import Chapters from "./ChapterList";
import Overlay from "./Overlay";
import ProgressBar from "./ProgressBar";
import StoreBookProgress from "./StoreBookProgress";
import WordLookup from "./WordLookup";

interface Props {
    id: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useBook(props.id);
    const [overlay, setOverlay] = useOverlayStore();

    const rendition = useRendition(book, bookElRef);
    globalThis.rendition = rendition;
    globalThis.book = book;

    const progress = useBookPercentage(rendition);

    useEffect(() => {
        if (!rendition) return;

        // TODO: Show the overlay when the center is tapped.
        rendition.on('keyup', (e: KeyboardEvent) => e.key == "Enter" && setOverlay('none'));
    }, [rendition]);
    return <div className="w-screen h-screen">
        <StoreBookProgress rendition={rendition} />
        <div className="pointer-events-none top-0 absolute left-0 right-0">
            <ProgressBar progress={progress} />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <BookControls rendition={rendition} showMenu={() => setShowOverlay(true)} />
        <WordLookup />
        <BookMenu book={book} rendition={rendition} />
    </div>
}