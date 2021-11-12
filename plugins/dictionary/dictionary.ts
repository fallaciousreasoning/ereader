import { DictionaryProvider } from "./dictionaryProvider"
import { GcideDictionary } from "./gcideDictionary"

let dictionary: DictionaryProvider = new GcideDictionary();
export const getDefinition = (word: string) => {
    return dictionary.getDefinition(word);
}