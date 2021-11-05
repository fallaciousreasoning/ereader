import React from "react";
import Cog from "../icons/Cog";

interface Props extends React.HTMLProps<HTMLDivElement> {
    icon: React.ElementType<React.SVGProps<any>>;
}

const aspectRatio = { aspectRation: '1/1' } as const;
export default function IconButton(props: Props) {
    const { icon, ...rest } = props;
    return <div className="h-12 relative p-2" style={aspectRatio as any} {...rest}>
        <div className="rounded-full z-0 w-full h-full hover:bg-gray-400 transition-colors duration-100 top-0 left-0 right-0 bottom-0 absolute opacity-0 hover:opacity-60">

        </div>
        <div className="z-10">
            {React.createElement(props.icon, { height: '2rem', width: '2rem' })}
        </div>
    </div>
}