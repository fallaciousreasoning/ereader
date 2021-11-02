import { Rendition } from "epubjs";
import useBookInteractions from "../hooks/useBookInteractions";

interface Props {
    rendition: Rendition;
    bookRef: React.MutableRefObject<HTMLDivElement>;
    showMenu?: () => void;
}

export default function BookControls(props: Props) {
    useBookInteractions(props.rendition, props.bookRef);

    return null && <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none gap-24 opacity-80 grid grid-cols-3 text-3xl">
        <div className="bg-blue-50 flex items-center justify-center">Previous Page</div>
        <div className="bg-green-50 flex items-center justify-center">Menu</div>
        <div className="bg-yellow-50 flex items-center justify-center">Next Page</div>
    </div>;
}