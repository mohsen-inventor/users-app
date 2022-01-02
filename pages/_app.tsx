import '../sass/global.scss'
import type { AppProps } from 'next/app'
import { Page } from '../components/_layout/Page/Page'

function MyApp({ Component, pageProps }: AppProps) {
  return <Page><Component {...pageProps} /></Page>
}

export default MyApp
