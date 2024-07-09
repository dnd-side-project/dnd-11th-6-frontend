import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import GlobalStyled from '@/styles/GlobalStyled'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
