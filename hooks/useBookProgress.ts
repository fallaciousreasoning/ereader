import { Book, Location, Rendition } from 'epubjs';
import { useEffect, useState } from 'react';
import { time } from '../utils/time';

export default (rendition: Rendition) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!rendition) return;

        const listener = (location: Location) => {
            const percent = rendition.book.locations.percentageFromCfi(location.start.cfi);
            setProgress(percent)
        };
        rendition.on('relocated', listener);

        return () => rendition.off('relocated', listener);
    }, [rendition]);

    return progress;
}