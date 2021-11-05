import { Book, NavItem, Rendition } from "epubjs";
import { useCallback } from "react";

interface Props {
    book: Book;
    rendition: Rendition;
}

function ChapterHeading(props: { chapter: NavItem, rendition: Rendition }) {
    const navigate = useCallback(() => {
        props.rendition.display(props.chapter.href);
    }, [props.chapter, props.rendition]);
    return <li>
        <span className="text-blue-600 underline cursor-pointer" onClick={navigate}>{props.chapter.label}</span>
        {props.chapter.subitems && !!props.chapter.subitems.length && <ul className="ml-2">
            {props.chapter.subitems.map(s => <ChapterHeading chapter={s} rendition={props.rendition} key={s.id} />)}
        </ul>}
    </li>
}

export default function Chapters(props: Props) {
    return <div className="h-full max-w-md overflow-y-auto overflow-x-hidden">
        <h2 className="text-2xl">Table of Contents</h2>
        <ul className="text-lg">
            {props.book.navigation.toc.map((entry) => <ChapterHeading chapter={entry} rendition={props.rendition} key={entry.id} />)}
        </ul>
    </div>
}