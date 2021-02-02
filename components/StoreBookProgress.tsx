import { Book, Rendition } from "epubjs";
import { useEffect } from "react";
import { saveProgress } from "../data/db";

export default (props: { rendition: Rendition }) => {

    useEffect(() => {
        if (!props.rendition) return;

        const handler = () => saveProgress(props.rendition);
        props.rendition.on('relocated', handler);
        return () => props.rendition.off('relocated', handler);
    }, [props.rendition]);

    return null;
}