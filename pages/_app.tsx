import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Load Prism.js for syntax highlighting
    if (typeof window !== 'undefined') {
      require('prismjs')
      require('prismjs/components/prism-javascript')
      require('prismjs/themes/prism-tomorrow.css')
    }
  }, [])

  return <Component {...pageProps} />
}
