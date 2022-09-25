import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import Layout from "@/containers/Layout";
import ThemeProvider from "@/containers/Providers/ThemeProvider";
import AuthProvider from "@/containers/Providers/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster position="top-right" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
