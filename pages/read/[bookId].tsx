import { useRouter } from "next/router";
import React from "react";
import Reader from "../../components/Reader";

export default function Read() {
    const router = useRouter();
    const bookId = router.query.bookId?.toString();

    return <div>
        {bookId && <Reader id={bookId} />}
    </div>
};