import { logs } from "../hooks/useBookInteractions";

export default function InteractionLog() {
    return <div>
        <div>
            A page for helping debug book interactions on iOS, because nothing ever works there.
        </div>
        <div>
            {logs.reverse().map((l, i) => <div key={i} className="flex flex-row gap-1">
                <b>Timestamp:</b> {l.timestamp}, <b>Type:</b> {l.type}, <b>Detail:</b> {l.detail}
            </div>)}
        </div>
    </div>
}