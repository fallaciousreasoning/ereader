import { Rendition } from "epubjs";
import { useMemo, useRef } from "react";
import useBookInteractions from "../hooks/useBookInteractions";

interface Props {
    rendition: Rendition;
    showMenu?: () => void;
}

export default function BookControls(props: Props) {
    const previousRef = useRef<HTMLDivElement>();
    const menuRef = useRef<HTMLDivElement>();
    const nextRef = useRef<HTMLDivElement>();

    const zones = useMemo(() => ({
        previous: previousRef,
        menu: menuRef,
        next: nextRef
    }), [previousRef, menuRef, nextRef]);

    useBookInteractions(props.rendition, zones, props.showMenu);

    return <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none gap-10 opacity-0 grid grid-cols-3 text-3xl">
        <div ref={previousRef} className="bg-blue-50 flex items-center justify-center">Previous Page</div>
        <div ref={menuRef} className="bg-green-50 flex items-center justify-center">Menu</div>
        <div ref={nextRef} className="bg-yellow-50 flex items-center justify-center">Next Page</div>
    </div>;
}