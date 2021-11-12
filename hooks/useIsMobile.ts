import { useEffect, useState } from "react"

const breakpoint = 800;
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(globalThis.innerWidth < breakpoint);
    useEffect(() => {
        const handler = () => setIsMobile(globalThis.innerWidth < breakpoint);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    })
    return isMobile;
}