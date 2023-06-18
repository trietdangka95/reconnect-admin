import App, { AppProps, AppContext } from "next/app";
import HeaderPage from "../components/Header";
import "../styles/globals.css";
import Head from "next/head";
import FooterPage from "../components/Footer";
import { useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const saveEnv = async () => {
      const isEnv = JSON.parse(localStorage.getItem("env") as string);
      isEnv && localStorage.removeItem("env");

      const res = await fetch("../public/env.json");
      const env = await res.json();
      localStorage.setItem("env", JSON.stringify(env));
    };
    saveEnv();
  }, []);
  const hiddenPage = useMemo(() => {
    const excluded = ["/login", "/signup"];
    const currentRoute = router.pathname;

    return excluded.indexOf(currentRoute) !== -1;
  }, [router]);

  return (
    <div id="root">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>REConenct Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layout-container">
        {!hiddenPage && <HeaderPage />}
        {!hiddenPage && <Sidebar />}
        <main className={`${!hiddenPage ? "internal-page" : "external-page"}`}>
          <Component {...pageProps} />
        </main>
        {!hiddenPage && <FooterPage />}
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (appcontext: AppContext) => {
  const appProps = await App.getInitialProps(appcontext);
  return {
    pageProps: {
      ...appProps.pageProps,
    },
  };
};

export default MyApp;
