import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { defaultTheme, Theme } from "../types/theme";
import { db } from "./db"

const THEME_ID = "theme";

export const useTheme = () => {
    const fromDb = useLiveQuery(getTheme, []);
    return useMemo(() => ({ ...defaultTheme, ...fromDb }), [fromDb]);
}

export const getTheme = async () => {
    return db.themes.limit(1).first();
}

export const updateTheme = async (update: Partial<Theme>) => {
    const existing = await getTheme();
    return db.themes.put({ id: THEME_ID, ...existing, ...update });
}

globalThis.updateTheme = updateTheme;