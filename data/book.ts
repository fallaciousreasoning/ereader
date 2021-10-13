import { Metadata } from "../types/metaData";
import { Book, Rendition } from "epubjs";
import { BookEntry, db } from "./db";
import * as Epub from "epubjs/dist/epub"
import { addBookImage } from "./image";

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
    const book = new Epub.Book(entry.data) as Book & { id: string };
    book.id = entry.bookId;

    loadLocations(book, entry);
    return book;
}

export const getBookFromSource = async (url: string) => {
    if (!url) return null;

    let entry = await db.books.get(url);
    if (entry) return bookFromEntry(entry);
    
    const response = await fetch(url);
    const blob = await response.blob();

    entry = { bookId: url, data: blob, locations: [] };
    
    const ebook = new Epub.Book(blob) as Book & { id: string };
    ebook.id = url;

    await ebook.ready;

    db.books.add(entry).then(async () => {
        loadLocations(ebook, entry);
    });

    const metadata = (ebook as any)?.package?.metadata as Metadata;
    metadata.bookId = url;
    await db.metadata.add(metadata);

    // No need to wait.
    addBookImage(entry, ebook);
    
    return ebook;
}

export const metadataForBooks = () => {
    return db.metadata.toArray();
}