import { Metadata } from "../types/metaData";

export const bookMatches = (meta: Metadata, filter: string) => {
    filter = filter.toLowerCase();
    const title = meta.title.toLowerCase();
    const author = meta.creator.toLowerCase();
    const publisher = meta.publisher.toLowerCase();

    return title?.includes(filter)
        || author?.includes(filter)
        || publisher?.includes(filter);
}