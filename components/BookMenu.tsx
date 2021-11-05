import { Book, Rendition } from "epubjs";
import React from "react";
import Chapters from "./ChapterList";
import Overlay, { OverlayProps } from "./Overlay";

interface Props extends OverlayProps {
    book: Book;
    rendition: Rendition;
}

export default function BookMenu(props: Props) {
    return <Overlay {...props}>
        <Chapters book={props.book} rendition={props.rendition} />
    </Overlay>
}