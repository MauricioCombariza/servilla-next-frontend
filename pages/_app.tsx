import '@/styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '@/Auth';
import type { AppProps } from 'next/app';
import { NavBar } from '@/components/NavBar/NavBarTailwind';
import Script from 'next/script'; // Importa el componente Script

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JCQST79BSL"
          strategy="lazyOnload"
        />
        <Script
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JCQST79BSL');
            `,
          }}
        />
        {/* Google Tag Manager - Sección del body */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-GTM-MZBMVT97" height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* End Google Tag Manager - Sección del body */}
        {/* Start of HubSpot Embed Code */}
        <Script
          src="//js.hs-scripts.com/45377115.js"
          strategy="lazyOnload"
        />
        {/* End of HubSpot Embed Code */}

        <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/combariza/image/upload/v1695061362/Servilla/servilla_favicon.png" />
        <title>Servilla S.A.S - Solución logística</title>
        <meta name="description" content="Empresa dedicada al envío de paquetes y documentos, en Colombia, desde 1974" />
        <meta name="keywords" content="paquetería, envíos, logística, mensajería, distribución" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
