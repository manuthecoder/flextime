import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import * as React from "react";
import { Layout } from "../components/Layout";
import "../styles/globals.scss";

export default function App({ Component, pageProps }): React.ReactElement {
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

  const session = {
    name: "Manusvath Gurudath",
    email: "manusvathgurudath@gmail.com",
  };

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="theme-color" content="#e8f5e9" />
        <link rel="shortcut icon" href="/icons/192x192.png" />
        <title>Flextime &bull; Irvine High</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
