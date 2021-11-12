import { useState } from "react"

type TabHeader = string | React.ReactNode | ((selected: boolean) => React.ReactNode)

interface Props {
    headers: TabHeader[];
    children: React.ReactNode[];
    stickyHeader?: boolean;
}

function RenderTabHeader(selected: boolean, header: TabHeader) {
    if (typeof header === "string")
        return <div className={selected ? 'bg-primary' : ''}>
            {header}
        </div>;

    if (typeof header === "function")
        return header(selected);

    return header;
}

export default function Tabs(props: Props) {
    const [selected, setSelected] = useState(0);
    const selectedChild = props.children[selected];
    return <div className="w-full flex flex-col">
        <div className={`flex flex-row bg-background ${props.stickyHeader ? 'sticky top-0' : ''}`}>
            {props.headers.map((h, i) => <div key={i} className={`${i === selected ? 'bg-primary' : ''} p-2`} onClick={e => {
                setSelected(i);
                e.stopPropagation();
            }}>
                {RenderTabHeader(i === selected, h)}
            </div>)}
        </div>
        <div className="px-2 overflow-auto">
            {selectedChild}
        </div>
    </div>
}