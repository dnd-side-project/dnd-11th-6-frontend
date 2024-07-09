import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { createGlobalStyle } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: white;
  }
  `;
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
}
