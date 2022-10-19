import "../styles/globals.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { AuthVoterProvider } from "../context/VoterAuthProvider";
import { AuthProvider } from "../context/AuthProvider";
import Protected from "../components/Protected";
import "../styles/loader.scss";
function MyApp({ Component, pageProps }) {
  const noAuthRequired = ['/', '/dev', '/help', '/admin/login', '/admin/register', '/voter/register', '/voter/login']
  const router = useRouter();

  return (
    <AuthProvider>
      <AuthVoterProvider>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />

          <link rel="icon" href="/favicon.ico" />

        </Head>
        {
          noAuthRequired.includes(router.pathname) ? <Component {...pageProps} /> : <Protected><Component {...pageProps} /></Protected>
        }



      </AuthVoterProvider>
    </AuthProvider>

  );
}

export default MyApp;
