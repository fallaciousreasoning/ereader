import Head from 'next/head'
import { useEffect } from 'react'
import BookCard from '../components/BookCard';
import FilePicker from '../components/FilePicker'
import { metadataForBooks } from '../data/db';
import { usePromise } from '../hooks/usePromise'

export default function Home() {
  const metadata = usePromise(metadataForBooks, [], []);
  return (
    <div className="p-4">
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {metadata.map(meta => <BookCard metadata={meta} key={meta.bookId}/>)}
      </div>
      <div className="mt-2">
        <FilePicker />
      </div>
    </div>
  )
}
