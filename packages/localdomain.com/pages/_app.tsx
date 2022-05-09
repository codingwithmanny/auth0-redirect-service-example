// Imports
// ========================================================
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import RootProvider from '../providers';

// Main App Wrapper
// ========================================================
const MyApp = ({ Component, pageProps }: AppProps) => {
  return <RootProvider><Component {...pageProps} /></RootProvider>
}

// Exports
// ========================================================
export default MyApp
