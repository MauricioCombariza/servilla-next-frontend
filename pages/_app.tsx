import '@/styles/globals.css'
import Head from 'next/head';
import { AuthProvider } from '@/Auth'
import type { AppProps } from 'next/app'
import { NavBar } from '@/components/NavBar/NavBarTailwind'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
      {/* Google Tag Manager */}
      <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MZBMVT97');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Google Tag Manager - Sección del body */}
          <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-GTM-MZBMVT97" height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* End Google Tag Manager - Sección del body */}

        <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/combariza/image/upload/v1695061362/Servilla/servilla_favicon.png" />
        <title>Servilla S.A.S - Solución logística</title>
        <meta name="description" content="Empresa dedicada al envio de paquetes y documentos, en Colombia, desde 1974" />
        <meta name="keywords" content="paqueteria, envíos, logística, mensajeria, distribución" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
