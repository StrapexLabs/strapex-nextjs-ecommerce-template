import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import { CartProvider } from '@/hooks/use-shopping-cart';
import { Header, Footer } from '@/components/index';
import { Toaster } from 'react-hot-toast';
import CookieConsent from 'react-cookie-consent';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          Starknet Merch Store
        </title>
        <meta
          name="description"
          content="Starknet Store"
        />
        {/* */}
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Starknet Store" />
        <meta property="og:description" content="Starknet Store" />
        <meta property="og:image" content="./StarknetStore.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://starknetstore.com" />

      </Head>
      <CartProvider>
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
          <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
        </body>
      </CartProvider>
      <Toaster />
      <CookieConsent
        location="bottom"
        buttonText="I agree"
        cookieName="myAppCookieConsent"
        style={{ background: "#000000" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default MyApp;
