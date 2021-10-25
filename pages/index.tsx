import { useLiveQuery } from 'dexie-react-hooks';
import Head from 'next/head'
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

      <div className="grid gap-2 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fill, 150px)', gridAutoRows: '200px'}}>
        {metadata.map(meta => <BookCard metadata={meta} key={meta.bookId}/>)}
      </div>
      <div className="mt-2">
        <FilePicker onPick={file => getBookFromSource(URL.createObjectURL(file))}/>
      </div>
    </div>
  )
}
