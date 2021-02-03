import Dexie from "dexie";
import { Book, Rendition } from "epubjs";
import { Metadata } from "../types/metaData";
import * as Epub from "epubjs/dist/epub"
import { EPERM } from "constants";

interface BookEntry {
    bookId: string;
    data: Blob;
    locations: string[];
}

class Database extends Dexie {
    books: Dexie.Table<BookEntry, string>;
    metadata: Dexie.Table<Metadata, string>;
    progresses: Dexie.Table<{ bookId: string, lastLocation: string }, string>;

    constructor() {
        super("store");

        this.version(3)
            .stores({
                progresses: 'bookId',
                metadata: 'bookId',
                books: 'bookId'
            });
    }
}

const db = new Database();

export const saveBookProgress = async (rendition: Rendition) => {
    await db.progresses.put({ bookId: rendition.book['id'], lastLocation: (rendition.currentLocation() as any).start.cfi })
}

export const getBookProgress = async (book: Book) => {
    return (await db.progresses.get(book['id']))?.lastLocation;
}

const bookFromEntry = async (entry: BookEntry) => {
    const url = URL.createObjectURL(entry.data);
    const book = new Epub.Book(entry.data) as Book & { id: string };
    book.id = entry.bookId;

    book.locations.load(entry.locations as any);
    return book;
}

export const getBookFromSource = async (url: string) => {
    let entry = await db.books.get(url);
    if (entry) return bookFromEntry(entry);
    
    const response = await fetch(url);
    const blob = await response.blob();

    entry = { bookId: url, data: blob, locations: [] };
    
    const ebook = new Epub.Book(blob) as Book & { id: string };
    ebook.id = url;

    await ebook.ready;

    const locationsPromise = ebook.locations.generate(1600);

    db.books.add(entry).then(async () => {
        const locations = await locationsPromise;
        db.books.update(entry.bookId, { locations });
    });
    
    return ebook;
}