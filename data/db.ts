import Dexie from "dexie";
import { Metadata } from "../types/metaData";
import { Theme } from "../types/theme";

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
    themes: Dexie.Table<{ id: string } & Theme>;

    constructor() {
        super("store");

        this.version(6)
            .stores({
                progresses: 'bookId',
                metadata: 'bookId',
                books: 'bookId',
                images: 'id',
                themes: 'id'
            });
    }
}

export const db = new Database();
globalThis.db = db;