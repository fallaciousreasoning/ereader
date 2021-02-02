import Dexie from "dexie";
import { Book } from "epubjs";
import { Metadata } from "../types/metaData";

class Database extends Dexie {
    metadata: Dexie.Table<Metadata, string>;
    locations: Dexie.Table<{ bookId: string, locations: string[] }, string>;

    constructor() {
        super("store");

        this.version(1)
            .stores({
                metadata: 'bookId',
                locations: 'bookId'
            })
    }
}

const db = new Database();

// TODO: Not this.
const getBookId = (book: Book): string => (book as any).cover;

export const initializeLocations = async (book: Book) => {
    await book.ready;

    const id = await getBookId(book);

    const storedLocations = await db.locations.get(id);
    if (storedLocations) {
        book.locations.load(storedLocations.locations as any);
        return;
    }

    const locations = await book.locations.generate(1600) as string[]
    await db.locations.add({ bookId: id, locations });
}