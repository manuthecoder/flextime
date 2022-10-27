import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import * as React from "react";
import { Layout } from "../components/Layout";
import "../styles/globals.scss";
import { NoSsr } from "@mui/material";
import { getSession, SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}): React.ReactElement {
  const theme = createTheme({
    components: {
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          style: {
            textTransform: "none",
          },
        },
      },
    },
    palette: {
      primary: {
        main: green["800"],
      },
    },
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta name="theme-color" content="#e8f5e9" />
          <link rel="shortcut icon" href="/icons/192x192.png" />
          <title>Flextime &bull; Irvine High</title>
        </Head>
        <NoSsr>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NoSsr>
      </ThemeProvider>
    </SessionProvider>
  );
}
