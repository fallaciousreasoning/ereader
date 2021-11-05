import { useLiveQuery } from 'dexie-react-hooks';
import Head from 'next/head'
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import BookCard from '../components/BookCard';
import FilePicker from '../components/FilePicker'
import IconButton from '../components/IconButton';
import Search from '../components/Search';
import { importBook, metadataForBooks } from '../data/book';
import Cog from '../icons/Cog';
import { bookMatches } from '../utils/book';

const gridStyle = { gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gridAutoRows: 'minmax(160px, auto)' };
const aspectRatio = { aspectRatio: '3/4' };
export default function Home() {
  const metadata = useLiveQuery(metadataForBooks, []) || [];
  const [filter, setFilter] = useState('');
  const onFilterChanged = useCallback(e => setFilter(e.target.value), []);
  const filteredMetaData = useMemo(() => metadata.filter(m => bookMatches(m, filter)), [metadata, filter]);

  return (
    <div className="p-4">
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full flex flex-row gap-1">
        <Search className="w-full" placeholder="Filter by author or title" value={filter} onChange={onFilterChanged} />
        <Link href="settings">
          <IconButton icon={Cog} />
        </Link>
      </div>

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
