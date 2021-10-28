import { useCallback } from "react"

interface Props {
    open: boolean;
    dismissOnClick: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
}

export default function Overlay(props: Props) {
    const maybeDismiss = useCallback(() => {
        if (props.dismissOnClick) props.setOpen(false);
    }, [props.dismissOnClick]);

    return props.open && <div className="absolute top-0 bottom-0 left-0 right-0" onClick={maybeDismiss}>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-600 opacity-40">

        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0">
            {props.children}
        </div>
    </div>
}