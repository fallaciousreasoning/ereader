import type { Rendition } from 'epubjs';
import React, { useEffect, useRef, useState } from "react";
import { getBookProgress } from "../data/book";
import useBookInteractions from '../hooks/useBookInteractions';
import useBookPercentage from "../hooks/useBookPercentage";
import { useBook } from "../hooks/usePromise";
import useRendition from '../hooks/useRendition';
import { addSwipeEmitter, addTapEmitter } from '../utils/gestures';
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

    const progress = useBookPercentage(rendition);

    useBookInteractions(rendition, bookElRef);

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