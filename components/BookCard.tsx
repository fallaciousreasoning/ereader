import { Metadata } from "../types/metaData";

interface Props {
    metadata: Metadata;
}

export default (props: Props) => {
    return <div className="rounded-md shadow-lg px-2 py-1 w-32 h-48 border-gray-200 border">
        <h2 className="font-semibold">{props.metadata.title}</h2>
        by <span className="italic">{props.metadata.creator}</span>
    </div>
}