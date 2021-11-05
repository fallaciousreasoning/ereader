import { Book, Rendition } from "epubjs";
import React from "react";
import Cog from "../icons/Cog";
import Chapters from "./ChapterList";
import Overlay, { OverlayProps } from "./Overlay";
import Tabs from "./Tabs";

interface Props extends OverlayProps {
    book: Book;
    rendition: Rendition;
}

export default function BookMenu(props: Props) {
    return <Overlay {...props}>
        <div className="bg-background max-h-screen">
            <Tabs headers={["Chapters", <Cog width="2rem" height="2rem" />]}>
                <Chapters book={props.book} rendition={props.rendition} />
                <span>Other Thing</span>
            </Tabs>
        </div>
    </Overlay>
}