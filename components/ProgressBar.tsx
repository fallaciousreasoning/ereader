import { useMemo } from "react"

export default (props: { progress: number, className?: string }) => {
    const style = useMemo(() => ({ transform: `scaleX(${props.progress})`, transformOrigin: 'left' }), [props.progress]);
    return <div className={props.className || 'h-1'}>
        <div className="bg-purple-700 h-full w-full transition-transform" style={style}></div>
    </div>
}