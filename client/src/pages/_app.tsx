import '../../public/index.css';

import type { ReactElement, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import Layout from '@/components/molecules/layout';
import ThemeProvider from '@/context/ThemeContext';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function commonLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || commonLayout;

  return <ThemeProvider>{loading ? <div>Loading</div> : getLayout(<Component {...pageProps} />)}</ThemeProvider>;
}
