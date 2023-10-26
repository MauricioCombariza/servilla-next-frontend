import '@/styles/globals.css'
import { AuthProvider } from '@/Auth'
import type { AppProps } from 'next/app'
import { NavBar } from '@/components/NavBar/NavBarTailwind'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
