export interface PageTurn {
    startTime: number;
    endTime: number;
    wordCount: number;
}

export const turnTime = (pageTurn: PageTurn) => pageTurn.endTime - pageTurn.startTime;
export const wordsPerTick = (pageTurn: PageTurn)=> pageTurn.wordCount / turnTime(pageTurn);
export const wordsPerMinute = (pageTurn: PageTurn) => wordsPerTick(pageTurn) * 1000 /* ticks/second */ * 60 /* seconds/minute */;

export interface ReadRate {
    bookId: string;
    pageTurns: PageTurn[];
}

export const minPageTurnsForEstimate = 3;
export const pageTurnsToKeep = 20;