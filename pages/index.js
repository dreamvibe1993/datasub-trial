import React from "react";
import * as Yup from "yup";
import { Button, Center, createStyles, Group, Stack } from "@mantine/core";
import { InputWithFloatingLabel } from "../components/ui/input-floating-label";
import { useForm, yupResolver } from "@mantine/form";
import valid from "card-validator";
import { formatToCreditCardNumber } from "../utils/formatters/credit-card-number-autoformat";
import { excludeAllLetters } from "../utils/formatters/exclude-all-letters";

const useStyles = createStyles((theme) => ({
  modal: {
    border: `1px solid ${theme.colors.gray[2]}`,
    padding: 20,
  },
  mainContainer: {
    padding: 20,
    height: "100vh",
  },
  inputsRow: {
    "div[class*='mantine-TextInput-root'": {
      width: "50%",
    },
  },
}));

const schema = Yup.object().shape({
  cardNumber: Yup.string()
    .test(
      "test-number",
      "Credit Card number is invalid",
      (value) => valid.number(value).isValid
    )
    .required("Credit Card number is required!"),
  expDate: Yup.string()
    .test(
      "test-number",
      "Expiration date number is invalid",
      (value) => valid.expirationDate(value).isValid
    )
    .required("Expiration date number is required!"),
  cvv: Yup.string()
    .test(
      "test-number",
      "CVV number is invalid",
      (value) => valid.cvv(value).isValid
    )
    .required("CVV number is required!"),
  amount: Yup.number().required("Please enter amount of money to pay."),
});

export default function Home() {
  const { classes } = useStyles();
  const form = useForm({
    schema: yupResolver(schema),
    initialValues: {
      cardNumber: "",
      expDate: "",
      cvv: "",
      amount: 0,
    },
  });
  const handleButtonDisabling = () => {
    const { cardNumber, expDate, cvv, amount } = form.values;
    return !cardNumber || !expDate || !cvv || !amount;
  };

  const cardNumberInputProps = {
    ...form.getInputProps("cardNumber"),
    value: formatToCreditCardNumber(
      excludeAllLetters(form.getInputProps("cardNumber").value)
    ),
  };

  const amountInputProps = {
    ...form.getInputProps("amount"),
    value: excludeAllLetters(form.getInputProps("amount").value),
  };

  return (
    <Center className={classes.mainContainer}>
      <form onSubmit={form.onSubmit((vals) => console.log(vals))}>
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
            <Button type="submit" disabled={handleButtonDisabling()}>
              PAY
            </Button>
          </Group>
        </Stack>
      </form>
    </Center>
  );
}
