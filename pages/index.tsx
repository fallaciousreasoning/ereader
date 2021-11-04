import { useLiveQuery } from 'dexie-react-hooks';
import Head from 'next/head'
import React, { useCallback, useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import FilePicker from '../components/FilePicker'
import Search from '../components/Search';
import { importBook, metadataForBooks } from '../data/book';

const gridStyle = { gridTemplateColumns: 'repeat(auto-fill, minmax(150px, auto))', gridAutoRows: 'minmax(200px, auto)' };
const aspectRatio = { aspectRatio: '3/4'};
export default function Home() {
  const metadata = useLiveQuery(metadataForBooks, []) || [];
  const [filter, setFilter] = useState('');
  const onFilterChanged = useCallback(e => setFilter(e.target.value), []);
  const filteredMetaData = useMemo(() => metadata.filter(meta => meta.creator.includes(filter)
    || meta.title.includes(filter)
    || meta.publisher.includes(filter)), [metadata, filter]);

  return (
    <div className="p-4">
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Search className="w-full" placeholder="Filter by author or title" value={filter} onChange={onFilterChanged}/>

      <div className="grid gap-2 justify-items-stretch mt-2" style={gridStyle}>
        {filteredMetaData.map(meta => <div style={aspectRatio} key={meta.bookId}>
          <BookCard metadata={meta} key={meta.bookId} />
        </div>)}
      </div>
      <div className="mt-2">
        <FilePicker onPick={file => importBook(URL.createObjectURL(file))} />
      </div>
    </div>
  )
}
