import '../sass/global.scss'
import type { AppProps } from 'next/app'
import Page from '../components/_layout/Page/Page'
import UserEditModal from '../components/UserEditModal/UserEditModal';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
// Redux store
import { store, persistor } from '../state/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Page>
          <Component {...pageProps} />
          <UserEditModal />
        </Page>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
