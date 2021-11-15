import { Book, Rendition } from "epubjs";
import React, { useMemo } from "react";
import { useIsMobile } from "../hooks/useIsMobile";
import Cog from "../icons/Cog";
import List from "../icons/List";
import useOverlayStore from "../store/useOverlayStore";
import AppearanceConfig from "./AppearanceConfig";
import Chapters from "./ChapterList";
import Overlay from "./Overlay";
import Tabs from "./Tabs";

interface Props {
    book: Book;
    rendition: Rendition;
}

export const mobileStyle = { 
    maxHeight: '75vh',
    width: '100vh'
}
export const desktopStyle = { 
    width: '30rem',
    height: '100vh'
}

export default function BookMenu(props: Props) {
    const [overlay, setOverlay] = useOverlayStore();
    const isMobile = useIsMobile();
    const sizeConstraint = useMemo(() => isMobile ? mobileStyle : desktopStyle, [isMobile]);
    return <Overlay dismissOnClick open={overlay === 'menu'} setOpen={() => setOverlay('none')}>
        <div className="bg-background overflow-x-hidden overflow-y-auto" onClick={e => e.stopPropagation()} style={sizeConstraint}>
            <Tabs headers={[
                <List width="2rem" height="2rem" />,
                <Cog width="2rem" height="2rem" />]} stickyHeader>
                <Chapters book={props.book} rendition={props.rendition} />
                <AppearanceConfig />
            </Tabs>
        </div>
    </Overlay>
}