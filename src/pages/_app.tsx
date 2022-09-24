import { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";

import "@/styles/globals.css";
import Layout from "@/containers/Layout";
import ThemeProvider from "@/containers/Providers/ThemeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider
        autoDismiss
        newestOnTop
        transitionDuration={200}
        placement="top-right"
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
