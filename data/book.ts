import { Metadata } from "../types/metaData";
import { Book, Rendition } from "epubjs";
import { BookEntry, db } from "./db";
import { addBookImage } from "./image";
import { Md5 } from "ts-md5";

export const saveBookProgress = async (rendition: Rendition) => {
    const location = (rendition.currentLocation() as any).start.cfi;
    const percent = rendition.book.locations.percentageFromCfi(location);
    await db.progresses.put({ bookId: rendition.book['id'], lastLocation: location, percent  })
}

export const getBookProgress = async (book: Book | string) => {
    const id = typeof book === "string" ? book : book['id'];
    return (await db.progresses.get(id))?.lastLocation;
}

export const getBookPercent = async (book: Book | string) => {
    const id = typeof book === "string" ? book : book['id'];
    return (await db.progresses.get(id))?.percent || 0;
}

const loadLocations = async (book: Book, entry: BookEntry) => {
    await book.ready;

    if (!entry.locations.length) {
        book.locations['pause'] = 10;
        entry.locations = await book.locations.generate(1600) as any;
        await db.books.put(entry);
    }
    else book.locations.load(entry.locations as any);
}

const bookFromEntry = async (entry: BookEntry) => {
    const book = new Book(entry.data as any) as Book & { id: string };
    book.id = entry.bookId;

    loadLocations(book, entry);
    return book;
}

export const importBook = async (url: string) => {
    if (!url) return null;

    const response = await fetch(url);
    const blob = await response.blob();
    return importBookFromBlob(blob);
}

export const getBookFromId = async (id: string) => {
    const entry = await db.books.get(id);
    return bookFromEntry(entry);
}

export const importBookFromBlob = async (blob: Blob) => {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const id = new Md5().appendByteArray(bytes).end().toString();

    const existing = await db.books.get(id);
    if (existing) {
        return existing;
    }

    const entry = { bookId: id, data: blob, locations: [] };    
    const ebook = new Book(blob as any) as Book & { id: string };
    ebook.id = id;

    await ebook.ready;

    db.books.add(entry).then(async () => {
        loadLocations(ebook, entry);
    });

    const metadata = (ebook as any)?.package?.metadata as Metadata;
    metadata.bookId = id;
    await db.metadata.add(metadata);

    // No need to wait.
    addBookImage(entry, ebook);
    
    return ebook;
}

export const metadataForBooks = () => {
    return db.metadata.toArray();
}