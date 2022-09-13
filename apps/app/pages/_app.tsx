import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Credix Demo</title>
      </Head>
      <main className="tw-p-2">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
