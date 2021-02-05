import { useCallback } from "react"
import { pickFile } from "../utils/file"
import Button from "./Button"

interface Props {
    onPick?: (file: File) => void;
}
export default (props: Props) => {
    const pick = useCallback(async () => {
        const file = await pickFile({ accept: ['.epub', 'application/epub+zip']});
        if (props.onPick)
            props.onPick(file);
    }, []);

    return <Button onClick={pick}>
        Upload File
    </Button>
}