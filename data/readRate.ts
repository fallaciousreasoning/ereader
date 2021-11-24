import { useLiveQuery } from "dexie-react-hooks";
import { PageTurn, wordsPerMinute, wordsPerTick } from "../types/readRate";
import { db } from "./db";
import {middleN} from '../utils/stats';

export const recordPageTurn = async (bookId: string, pageTurn: PageTurn) => {
    const record = await db.readRates.get(bookId) ?? { bookId, pageTurns: [] };

    record.pageTurns.push(pageTurn);
    record.pageTurns.sort((a, b) => wordsPerTick(a) - wordsPerTick(b));

    await db.readRates.put(record);
}

export const useReadingSpeed = async (bookId: string) => {
    const readRate = useLiveQuery(() => db.readRates.get(bookId), [bookId]);
    if (!readRate) return 0;

    const turns = readRate.pageTurns;
    const middleTurns = middleN(readRate.pageTurns, 5);
    const averageWpm = middleTurns.map(t => wordsPerMinute(t)).reduce((prev, next) => prev + next, 0);
    return averageWpm;
}