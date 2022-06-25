import React from "react";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        breakpoints: {
          xs: 500,
          sm: 800,
          md: 1000,
          lg: 1200,
          xl: 1400,
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
