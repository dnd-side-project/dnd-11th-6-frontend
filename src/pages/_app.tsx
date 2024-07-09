import type { AppProps } from "next/app";
import { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyled from "@/styles/GlobalStyled";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyled />
        <Component {...pageProps} />
      </ThemeProvider>
    </Fragment>
  );
}
