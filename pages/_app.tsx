import '@/styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '@/Auth';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { NavBar } from '@/components/NavBar/NavBarTailwind';
import Script from 'next/script';
import { InstallBanner } from '@/components/InstallBanner';
import { initGA, logPageView } from '@/utils/analytics';
import { useEffect, FC } from 'react'; // Importa useEffect
import ServiceWorkerRegistration from '@/components/ServiceWorkersRegister';

interface MyAppProps {
  Component: FC;
  pageProps: any;
}

const MyApp: FC<MyAppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
  
    useEffect(() => {
      initGA();
      logPageView(window.location.pathname); // Pasa la URL actual
  
      const handleRouteChange = (url: string) => {
        logPageView(url);
      };
  
      router.events.on('routeChangeComplete', handleRouteChange);
  
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);
  
  return (
    <AuthProvider>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Servilla" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" sizes='180x180' />
        <meta name="msapplication-TileImage" content="/icons/mstile-150x150.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/combariza/image/upload/v1695061362/Servilla/servilla_favicon.png" />
        <title>Servilla S.A.S - Solución logística</title>
        <meta name="description" content="Empresa dedicada al envío de paquetes y documentos, en Colombia, desde 1974" />
        <meta name="keywords" content="paquetería, envíos, logística, mensajería, distribución" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <ServiceWorkerRegistration />
      <InstallBanner />
    </AuthProvider>
  );
}

export default MyApp;