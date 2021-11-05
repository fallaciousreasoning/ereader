import Head from "next/head";
import React from "react";
import AppearanceConfig from "../components/AppearanceConfig";

export default function Settings() {
    return <div>
        <Head>
            <title>Settings</title>
        </Head>
        <div className="flex flex-col m-auto my-2 max-w-3xl p-2 rounded shadow gap-2">
            <h2 className="text-2xl font-bold">Settings</h2>
            <AppearanceConfig/>
        </div>
    </div>
}