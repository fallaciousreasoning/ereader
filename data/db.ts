import Dexie from "dexie";
import { Book, Rendition } from "epubjs";
import { Metadata } from "../types/metaData";

class Database extends Dexie {
    metadata: Dexie.Table<Metadata, string>;
    locations: Dexie.Table<{ bookId: string, locations: string[] }, string>;
    progresses: Dexie.Table<{ bookId: string, lastLocation: string }, string>;

    constructor() {
        super("store");

        this.version(2)
            .stores({
                locations: 'bookId',
                progresses: 'bookId'
            })
    }
}

const db = new Database();

// TODO: Not this.
const getBookId = async (book: Book) => {
    await book.ready;
    return (book as any).cover as string;
}

export const initializeLocations = async (book: Book) => {
    const id = await getBookId(book);

    const storedLocations = await db.locations.get(id);
    if (storedLocations) {
        book.locations.load(storedLocations.locations as any);
        return;
    }

    const locations = await book.locations.generate(1600) as string[]
    await db.locations.add({ bookId: id, locations });
}

export const saveProgress = async (rendition: Rendition) => {
    const id = await getBookId(rendition.book);
    await db.progresses.put({ bookId: id, lastLocation: (rendition.currentLocation() as any).start.cfi })
}

export const getBookProgress = async (book: Book) => {
    const id = await getBookId(book);
    return (await db.progresses.get(id))?.lastLocation;
}