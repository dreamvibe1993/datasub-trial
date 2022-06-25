import React from "react";
import {
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Stack,
} from "@mantine/core";
import { InputWithFloatingLabel } from "../components/ui/inputs/input-floating-label";
import { useForm, yupResolver } from "@mantine/form";
import { formatToCreditCardNumber } from "../utils/formatters/credit-card-number-autoformat";
import { excludeAllLetters } from "../utils/formatters/exclude-all-letters";
import { CreditCardValidationSchema } from "../models/yup/schemas/credit-card-validation";
import axios from "axios";

const useStyles = createStyles((theme) => ({
  modal: {
    border: `1px solid ${theme.colors.gray[2]}`,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.xl,
  },
  modalSubmitButton: {
    position: "relative",
    overflow: "hidden",
    border: "none",
    "&:hover": {
      backgroundColor: theme.colors.blue[6],
      div: {
        left: "50%",
      },
    },
  },
  modalSubmitButtonGradient: {
    transition: "left .8s linear",
    position: "absolute",
    top: "50%",
    left: "-200%",
    transform: "translate(-50%, -50%)",
    width: "105%",
    height: "105%",
    borderRadius: theme.radius.sm,
    background: theme.colors.dark[5],
    boxShadow: `10px 10px 30px 50px ${theme.colors.dark[5]}`,
  },
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
  const form = useForm({
    schema: yupResolver(CreditCardValidationSchema),
    initialValues: {
      cardNumber: "",
      expDate: "",
      cvv: "",
      amount: "",
    },
  });

  const handleButtonDisabling = () => {
    const { cardNumber, expDate, cvv, amount } = form.values;
    return !cardNumber || !expDate || !cvv || !amount;
  };

  const cardNumberInputProps = {
    ...form.getInputProps("cardNumber"),
    onChange: (e) => {
      const formatted = formatToCreditCardNumber(
        excludeAllLetters(e.target.value)
      );
      form.getInputProps("cardNumber").onChange(formatted);
    },
  };

  const amountInputProps = {
    ...form.getInputProps("amount"),
    onChange: (e) => {
      const formatted = excludeAllLetters(e.target.value);
      form.getInputProps("amount").onChange(formatted);
    },
  };

  const pay = (values) => {
    axios.post("./api/payments/card", values);
  };

  return (
    <Center className={classes.mainContainer}>
      <form onSubmit={form.onSubmit((values) => pay(values))}>
        <Stack className={classes.modal}>
          <InputWithFloatingLabel
            type="text"
            label="CARD NUMBER"
            placeholder="0000 0000 0000 0000"
            formInputProps={cardNumberInputProps}
          />
          <Group position="apart">
            <InputWithFloatingLabel
              type="expiration-date"
              w={"60%"}
              label="EXPIRATION DATE"
              placeholder="MM/YYYY"
              formInputProps={form.getInputProps("expDate")}
            />
            <InputWithFloatingLabel
              type="number"
              w={"30%"}
              label="CVV"
              placeholder="000"
              formInputProps={form.getInputProps("cvv")}
            />
          </Group>
          <InputWithFloatingLabel
            type="text"
            label="Amount"
            placeholder="Amount"
            formInputProps={amountInputProps}
          />
          <Group position="right">
            <Button
              type="submit"
              disabled={handleButtonDisabling()}
              className={
                handleButtonDisabling() ? null : classes.modalSubmitButton
              }
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: 9999,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                PAY
              </div>
              <span style={{ opacity: 0 }}>PAY</span>
              <div
                className={
                  handleButtonDisabling()
                    ? null
                    : classes.modalSubmitButtonGradient
                }
              />
            </Button>
          </Group>
        </Stack>
      </form>
    </Center>
  );
}
