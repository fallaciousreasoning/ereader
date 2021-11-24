import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Reader from "../../components/Reader";
import { estimateWords} from '../../utils/estimateWords'
import { intersection, containedPercent } from "../../utils/rect";

export default function Read() {
    const router = useRouter();
    const bookId = router.query.bookId?.toString();

    return <div className="overflow-hidden">
        <Head>
            <meta name="viewport" content="width=device-width, user-scalable=no"/>
        </Head>
        {bookId && <Reader id={bookId} />}
    </div>
};

globalThis.estimateWords = estimateWords;
globalThis.containedPercent = containedPercent;