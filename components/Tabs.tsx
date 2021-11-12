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

const tabBorderThickness = '1px';
const verticalSeparator = { width: tabBorderThickness };
const horizontalSeparator = { height: tabBorderThickness };
function RenderTabHeaderContainer(props: { selected: boolean, setSelected: (s: boolean) => void, header: TabHeader }) {
    return <div className={`p-2 relative`} onClick={e => {
        props.setSelected(true);
        e.stopPropagation();
    }}>
        {props.selected && <div style={verticalSeparator} className="absolute left-0 top-0 bottom-0 w-1 bg-black" />}
        {RenderTabHeader(props.selected, props.header)}
        {props.selected && <div style={verticalSeparator} className="absolute right-0 top-0 bottom-0 w-1 bg-black" />}
        {!props.selected && <div style={horizontalSeparator} className="absolute right-0 left-0 bottom-0 h-1 bg-black" />}
    </div>
}

export default function Tabs(props: Props) {
    const [selected, setSelected] = useState(0);
    const selectedChild = props.children[selected];
    return <div className="w-full flex flex-col">
        <div className={`flex flex-row bg-background ${props.stickyHeader ? 'sticky top-0' : ''}`}>
            <div className="w-1 border-solid border-black border-b" />
            {props.headers.map((h, i) => <RenderTabHeaderContainer key={i} selected={i === selected} setSelected={() => setSelected(i)} header={h} />)}
            <div className="w-1 border-solid border-black border-b flex-1" />
        </div>
        <div className="px-2 overflow-auto">
            {selectedChild}
        </div>
    </div>
}