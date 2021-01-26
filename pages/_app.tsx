import "tailwindcss/tailwind.css";

if (typeof window === "undefined")
  (global as any).window = {}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
