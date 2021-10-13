import { Metadata } from "../types/metaData";
import Link from 'next/link';
import ProgressBar from "./ProgressBar";
import { getBookPercent } from "../data/book";
import { usePromise } from "../hooks/usePromise";
interface Props {
    metadata: Metadata;
}

export default (props: Props) => {
    const progress = usePromise(() => getBookPercent(props.metadata.bookId), [props.metadata.bookId], 0);
    return <Link href={`/read/${encodeURIComponent(props.metadata.bookId)}`}>
        <div className="rounded-md shadow-lg w-32 h-48 border-gray-200 border cursor-pointer overflow-hidden flex flex-col">
            <div className="px-2 py-1 flex-grow overflow-hidden">
                <h2 className="font-semibold">{props.metadata.title}</h2>
            by <span className="italic">{props.metadata.creator}</span>
            </div>
            <ProgressBar progress={progress} className="h-2"/>
        </div>
    </Link>
}