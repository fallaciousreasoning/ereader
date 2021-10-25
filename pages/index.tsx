import { useLiveQuery } from 'dexie-react-hooks';
import Head from 'next/head'
import BookCard from '../components/BookCard';
import FilePicker from '../components/FilePicker'
import { getBookFromSource, metadataForBooks } from '../data/book';

const gridStyle = { gridTemplateColumns: 'repeat(auto-fill, minmax(150px, auto))', gridAutoRows: 'minmax(200px, auto)' };
const aspectRatio = { aspectRatio: '3/4'};
export default function Home() {
  const metadata = useLiveQuery(metadataForBooks, []) || [];
  return (
    <div className="p-4">
      <Head>
        <title>eReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid gap-2 justify-items-stretch" style={gridStyle}>
        {metadata.map(meta => <div style={aspectRatio} key={meta.bookId}>
          <BookCard metadata={meta} key={meta.bookId} />
        </div>)}
      </div>
      <div className="mt-2">
        <FilePicker onPick={file => getBookFromSource(URL.createObjectURL(file))} />
      </div>
    </div>
  )
}
