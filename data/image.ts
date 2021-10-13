import { BookEntry, db } from './db';

export const addBookImage = async (info: BookEntry, ebook: ePub.Book) => {
    const coverUrl = await ebook.coverUrl();
    const response = await fetch(coverUrl);
    const blob = await response.blob();

    return db.images.add({ id: info.bookId, image: blob });
}

export const getCachedImageUrl = async (id: string) => {
    const entry = await db.images.get(id);
    if (!entry) return null;

    return URL.createObjectURL(entry.image);
}