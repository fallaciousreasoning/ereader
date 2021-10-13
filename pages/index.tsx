import { useLiveQuery } from 'dexie-react-hooks';
import Head from 'next/head'
import { useEffect } from 'react'
import BookCard from '../components/BookCard';
import FilePicker from '../components/FilePicker'
import { getBookFromSource, metadataForBooks } from '../data/book';

export default function Home() {
  const metadata = useLiveQuery(metadataForBooks, []) || [];
  return (
    <div className="p-4">
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row gap-1">
        {metadata.map(meta => <BookCard metadata={meta} key={meta.bookId}/>)}
      </div>
      <div className="mt-2">
        <FilePicker onPick={file => getBookFromSource(URL.createObjectURL(file))}/>
      </div>
    </div>
  )
}
