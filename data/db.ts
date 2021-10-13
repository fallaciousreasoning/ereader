import Dexie from "dexie";
import { Metadata } from "../types/metaData";

export interface BookEntry {
    bookId: string;
    data: Blob;
    locations: string[];
}

class Database extends Dexie {
    books: Dexie.Table<BookEntry, string>;
    metadata: Dexie.Table<Metadata, string>;
    progresses: Dexie.Table<{ bookId: string, lastLocation: string, percent: number }, string>;
    images: Dexie.Table<{ id: string, image: Blob }>;

    constructor() {
        super("store");

        this.version(5)
            .stores({
                progresses: 'bookId',
                metadata: 'bookId',
                books: 'bookId',
                images: 'id'
            });
    }
}

export const db = new Database();
(window as any).db = db;