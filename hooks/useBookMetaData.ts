import { Book } from "epubjs";
import { useEffect, useState } from "react";
import { Metadata } from "../types/metaData";

export default (book: Book) => {
    const [metadata, setMetaData] = useState<Metadata | undefined>((book as any)?.package?.metadata);

    useEffect(() => {
        let cancelled = false;

        book.ready.then(() => {
            if (cancelled) return;

            setMetaData((book as any)?.package?.metadata);
        });

        return () => cancelled = true;
    }, [book]);

    return metadata;
}