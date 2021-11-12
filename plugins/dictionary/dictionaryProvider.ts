export interface Definition {
    definition: string;
    antonyms: string[];
    synonyms: string[];
}
export interface DictionaryProvider {
    getDefinition: (word: string) => Promise<Definition[]>;
}