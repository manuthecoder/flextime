import { Layout } from "../components/Layout";

export default function App({ Component, pageProps }): React.ReactElement {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
