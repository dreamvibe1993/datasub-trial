import React from "react";
import { Center, createStyles } from "@mantine/core";
import { CardPaymentModal } from "../components/card-payment-modal/card-payment-modal";

const useStyles = createStyles((theme) => ({
  mainContainer: {
    padding: 20,
    height: "100vh",
    background: theme.fn.linearGradient(
      135,
      theme.colors.lime[1],
      theme.colors.gray[1]
    ),
  },
  inputsRow: {
    "div[class*='mantine-TextInput-root'": {
      width: "50%",
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();

  return (
    <Center className={classes.mainContainer}>
      <CardPaymentModal />
    </Center>
  );
}
