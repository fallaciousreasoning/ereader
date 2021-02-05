import { Metadata } from "../types/metaData";
import Link from 'next/link';
interface Props {
    metadata: Metadata;
}

export default (props: Props) => {

    return <Link href={`/read/${encodeURIComponent(props.metadata.bookId)}`}>
        <div className="rounded-md shadow-lg px-2 py-1 w-32 h-48 border-gray-200 border cursor-pointer">
            <h2 className="font-semibold">{props.metadata.title}</h2>
            by <span className="italic">{props.metadata.creator}</span>
        </div>
    </Link>
}