import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#90cdf4" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
