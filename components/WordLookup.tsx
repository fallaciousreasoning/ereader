import { useMemo, useState } from "react";
import { usePromise } from "../hooks/usePromise";
import { getDefinition } from "../plugins/dictionary/dictionary";
import { Definition } from "../plugins/dictionary/dictionaryProvider";
import Overlay from "./Overlay";
import Search from "./Search";

const useDefinitions = (word: string) => {
    return usePromise(() => getDefinition(word), [word], [])
}

function DefinitionEntry(props: { definition: Definition }) {
    return <li>
        {props.definition.definition}
    </li>
}

export default function WordLookup() {
    const [word, setWord] = useState('');
    const definitions = useDefinitions(word);

    return <Overlay dismissOnClick open={false} setOpen={() => { }}>
        <div className="m-auto w-96 border-foreground border bg-white rounded py-2">
            <div className="flex flex-col">
                <div className="px-2">
                    <Search className="w-full" placeholder="search for a word" value={word} onChange={e => setWord(e.target['value'])} />
                    <div>
                        <i>
                            {definitions.length
                                ? `Found ${definitions.length} definitions for`
                                : 'No definition found for'}
                        </i>
                        &nbsp;{word}
                    </div>
                </div>
                <ol className="list-inside list-decimal overflow-y-auto max-h-96 px-2">
                    {definitions.map((d, i) => <DefinitionEntry key={i} definition={d} />)}
                </ol>
            </div>
        </div>
    </Overlay>
}