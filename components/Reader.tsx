import React, { useEffect, useRef } from "react";
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import useRendition from '../hooks/useRendition';
import { useWordsOnPage } from "../hooks/useWordsOnPage";
import useOverlayStore from "../store/useOverlayStore";
import BookControls from "./BookControls";
import BookMenu from "./BookMenu";
import ProgressBar from "./ProgressBar";
import StoreBookProgress from "./StoreBookProgress";
import WordLookup from "./WordLookup";

interface Props {
    id: string;
}

export default function Reader(props: Props) {
    const bookElRef = useRef<HTMLDivElement>();
    const book = useBook(props.id);
    const [, setOverlay] = useOverlayStore();

    const rendition = useRendition(book, bookElRef);
    globalThis.rendition = rendition;
    globalThis.book = book;

    const progress = useBookPercentage(rendition);
    const words = useWordsOnPage(bookElRef, rendition);
    console.log("Words", words);

    useEffect(() => {
        if (!rendition) return;

        rendition.on('keyup', (e: KeyboardEvent) => e.key == "Enter" && setOverlay('none'));
    }, [rendition]);
    return <div className="w-screen h-screen overflow-hidden">
        <StoreBookProgress rendition={rendition} />
        <div className="pointer-events-none top-0 absolute left-0 right-0">
            <ProgressBar progress={progress} />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0" ref={bookElRef}>

        </div>
        <BookControls rendition={rendition} />
        <WordLookup />
        <BookMenu book={book} rendition={rendition} />
    </div>
}