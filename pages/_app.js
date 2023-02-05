import '@/styles/globals.css';
import Layout from '../components/layout';
import { ToastContainer } from 'react-toastify'; //npm i react-toastify //per alert carini
import 'react-toastify/dist/ReactToastify.min.css';


export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={1}/>
      <Component {...pageProps} />
    </Layout>
  )
}
