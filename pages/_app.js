import { Provider } from 'react-redux';
import store from '../redux/store'
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}