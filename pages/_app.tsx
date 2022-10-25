import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { Layout } from "../components/Layout";
import "../styles/globals.scss";

export default function App({ Component, pageProps }): React.ReactElement {
  const theme = createTheme({
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
