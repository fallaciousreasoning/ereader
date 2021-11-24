import { useLiveQuery } from "dexie-react-hooks";
import { PageTurn, pageTurnsToKeep, wordsPerMinute, wordsPerTick } from "../types/readRate";
import { db } from "./db";
import {middleN} from '../utils/stats';

export const recordPageTurn = async (bookId: string, pageTurn: PageTurn) => {
    const record = await db.readRates.get(bookId) ?? { bookId, pageTurns: [] };

    record.pageTurns.push(pageTurn);
    record.pageTurns.sort((a, b) => wordsPerTick(a) - wordsPerTick(b));

    // If we have too many page turns, delete the first an last (to keep the median balanced).
    while (record.pageTurns.length > pageTurnsToKeep) {
        record.pageTurns.splice(record.pageTurns.length - 1, 1);
        record.pageTurns.splice(0, 1);
    }

    await db.readRates.put(record);
}

export const useReadingSpeed = (bookId: string) => {
    const readRate = useLiveQuery(() => db.readRates.get(bookId), [bookId]);
    if (!readRate) return 0;

    const middleTurns = middleN(readRate.pageTurns, 5);
    const averageWpm = middleTurns.map(t => wordsPerMinute(t)).reduce((prev, next) => prev + next, 0) / middleTurns.length;
    return averageWpm;
}