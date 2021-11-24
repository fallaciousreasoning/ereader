import { Rendition } from "epubjs";
import React, { useEffect, useRef, useState } from "react";
import { recordPageTurn } from "../data/readRate";
import { PageTurn } from "../types/readRate";
import { useWordsOnPage } from "./useWordsOnPage";

export const useReadRateRecorder = (bookId: string, container: React.MutableRefObject<HTMLDivElement>, rendition: Rendition) => {
    const wordsOnPage = useWordsOnPage(container, rendition);
    const wordsOnPageRef = useRef(wordsOnPage);
    useEffect(() => {
        wordsOnPageRef.current = wordsOnPage;
    }, [wordsOnPage]);

    useEffect(() => {
        if (!rendition) return;

        let startTime = Date.now();

        const pageTurned = () => {
            recordPageTurn(bookId, { endTime: Date.now(), startTime, wordCount: wordsOnPageRef.current });
            startTime = Date.now();
        };

        rendition.on('locationChanged', pageTurned);

        return () => {
            rendition.off('locationChanged', pageTurned);
        }
    }, [rendition]);
}