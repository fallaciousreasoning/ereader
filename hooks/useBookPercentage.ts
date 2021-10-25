import { Book, Location, Rendition } from 'epubjs';
import { useEffect, useState } from 'react';
import { time } from '../utils/time';

export default (rendition: Rendition) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (!rendition) return;

        const listener = (location: Location) => setPercent(rendition.book.locations.percentageFromCfi(location.start.cfi));
        rendition.on('relocated', listener);

        return () => rendition.off('relocated', listener);
    }, [rendition]);

    return percent;
}