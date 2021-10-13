import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { BookEntry, db } from './db';

export const addBookImage = async (info: BookEntry, ebook: ePub.Book) => {
    const coverUrl = await ebook.coverUrl();
    const response = await fetch(coverUrl);
    const blob = await response.blob();

    return db.images.add({ id: info.bookId, image: blob });
}

export const useCachedImageUrl = (id: string) => {
    const query = useLiveQuery(() => db.images.get(id), [id]);
    const blobUrl = useMemo(() => query && URL.createObjectURL(query.image), [query?.image]);
    return blobUrl;
}