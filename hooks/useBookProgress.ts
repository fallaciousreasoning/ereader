import { Book, Location, Rendition } from 'epubjs';
import { useEffect, useState } from 'react';
import { time } from '../utils/time';

export default (rendition: Rendition) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!rendition) return;

        rendition.on('relocated', (location: Location) => {
            const percent = rendition.book.locations.percentageFromCfi(location.start.cfi);
            console.log(location, percent)
            setProgress(percent)
        });
    }, [rendition]);

    return progress;
}