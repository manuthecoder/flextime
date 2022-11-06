import { NoSsr } from "@mui/material";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import * as React from "react";
import { Toaster } from "react-hot-toast";
import { Layout } from "../components/Layout";
import "../styles/globals.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}): React.ReactElement {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="theme-color" content="#e8f5e9" />
        <link rel="shortcut icon" href="https://i.ibb.co/9vqnLWg/image.png" />
        <title>Flextime &bull; Irvine High</title>
      </Head>
      <NoSsr>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NoSsr>
      <Toaster />
    </SessionProvider>
  );
}
