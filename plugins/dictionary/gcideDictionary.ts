import { Definition, DictionaryProvider } from "./dictionaryProvider";

interface Definitions { [word: string]: Definition[] };
export class GcideDictionary implements DictionaryProvider {
    definitions: Definitions;
    words: string[];
    initialized = false;

    async initialise() {
        // Don't call initialize more than once.
        if (this.initialized) return;

        this.initialized = true;

        const response = await fetch('/public/dictionary.json');
        const json = await response.json() as Definitions;

        this.definitions = json;
        this.words = Object.keys(this.words);
    }

    async getWords() {
        if (!this.words) {
            await this.initialise();
        }
        return this.words;
    }

    async getDefinition(word: string) {
        await this.initialise();
        return this.definitions[word.toLowerCase()] ?? [];
    }
}