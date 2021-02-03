import Button from "./Button"

interface Props {
    onPick?: (blob: Blob) => void;
}
export default (props: Props) => {
    return <Button onClick={console.log}>
        Upload File
    </Button>
}