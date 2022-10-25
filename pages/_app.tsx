import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import * as React from "react";
import { Layout } from "../components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.scss";
import { NoSsr } from "@mui/material";
import { useGoogleOneTapLogin } from "@react-oauth/google";

const Auth = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return <></>;
};
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
  const CLIENT_ID =
    "20713454957-r0fhgg5dqvek7rpnkbni7bqrp863bivp.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Auth />
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
    </GoogleOAuthProvider>
  );
}
