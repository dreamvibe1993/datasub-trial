import React from "react";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { NotificationsProvider } from "@mantine/notifications";

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
      <NotificationsProvider position="top-center" limit={5}>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
