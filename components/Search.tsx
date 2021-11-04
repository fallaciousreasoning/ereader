import { useMemo } from "react";

interface Props extends React.HTMLProps<HTMLInputElement> {

}

export default function Search(props: Props) {
    const { className, ...rest } = props;
    const mergedClassName = useMemo(() => `text-lg focus:border-primary border rounded p-2 outline-none ${className}`, [className]);
    return <input type="search" className={mergedClassName} {...rest}/>;
}