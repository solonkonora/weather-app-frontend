// src/pages/_app.tsx
import '../app/globals.css'; // Import your global CSS file for Tailwind, this applies everywhere
import type { AppProps } from 'next/app'; // Import AppProps type

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />; // Render the page: this refers to the current page
}

export default MyApp;