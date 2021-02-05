interface Props {
    onClick: () => void;
    children: React.ReactNode;
}
export default (props: Props) => {
    return <button className="py-2 px-4 focus:outline-none z-10 text-sm font-medium relative overflow-hidden text-foreground duration-200 ease-in bg-primary hover:bg-primary-hover hover:elevation-5 elevation-3 rounded" {...props}>
        {props.children}
    </button>
}