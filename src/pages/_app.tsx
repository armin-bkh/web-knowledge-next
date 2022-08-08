import "../styles/globals.css";
import { AppProps } from "next/app";
import Layout from "@/containers/Layout";
import ThemeProvider from "@/containers/Providers/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
