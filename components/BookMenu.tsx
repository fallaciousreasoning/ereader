import { Book, Rendition } from "epubjs";
import React, { useMemo } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
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

export const halfHeight = { maxHeight: '75vh' }
export const halfWidth = { maxWidth: '50vw' }
export default function BookMenu(props: Props) {
    const isMobile = useIsMobile();
    const sizeConstraint = useMemo(() => isMobile ? halfHeight : halfWidth, [isMobile]);
    return <Overlay {...props}>
        <div className="bg-background overflow-x-hidden overflow-y-auto" onClick={e => e.stopPropagation()} style={sizeConstraint}>
            <Tabs headers={[<List width="2rem" height="2rem" />, <Cog width="2rem" height="2rem" />]} stickyHeader>
                <Chapters book={props.book} rendition={props.rendition} />
                <AppearanceConfig />
            </Tabs>
        </div>
    </Overlay>
}