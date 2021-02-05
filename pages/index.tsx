import Head from 'next/head'
import { useEffect } from 'react'
import FilePicker from '../components/FilePicker'
import { metadataForBooks } from '../data/db';
import { usePromise } from '../hooks/usePromise'

export default function Home() {
  const metadata = usePromise(metadataForBooks, [], []);
  return (
    <div>
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {metadata.map(meta => <div key={meta.bookId}>
          Foo: {meta.title}
        </div>)}
      </div>
      <div>
      </div>
    </div>
  )
}
