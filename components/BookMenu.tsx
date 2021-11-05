import { Book, Rendition } from "epubjs";
import React from "react";
import Cog from "../icons/Cog";
import List from "../icons/List";
import AppearanceConfig from "./AppearanceConfig";
import Chapters from "./ChapterList";
import Overlay, { OverlayProps } from "./Overlay";
import Tabs from "./Tabs";

interface Props extends OverlayProps {
    book: Book;
    rendition: Rendition;
}

export default function BookMenu(props: Props) {
    return <Overlay {...props}>
        <div className="bg-background max-h-screen" onClick={e => e.stopPropagation()}>
            <Tabs headers={[<List width="2rem" height="2rem" />, <Cog width="2rem" height="2rem" />]}>
                <Chapters book={props.book} rendition={props.rendition} />
                <AppearanceConfig />
            </Tabs>
        </div>
    </Overlay>
}