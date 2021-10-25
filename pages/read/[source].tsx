import { useRouter } from "next/router";
import React from "react";
import Reader from "../../components/Reader";

export default function Read() {
    const router = useRouter();
    const source = router.query.source?.toString();

    return <div>
        <Reader id={source} />
    </div>
};