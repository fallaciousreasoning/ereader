interface Props {
    onClick: () => void;
    children: React.ReactNode;
}
export default (props: Props) => {
    return <button className="rounded-md bg-purple-700 hover:bg-purple-500 border-black-1" {...props}>
        {props.children}
    </button>
}