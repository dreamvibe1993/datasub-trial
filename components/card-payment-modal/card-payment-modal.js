import React from "react";
import axios from "axios";
import {
  createStyles,
  Group,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";

import { CreditCardValidationSchema } from "../../models/yup/schemas/credit-card-validation";
import { ButtonGradientOnHover } from "../../components/ui/buttons/button-gradient-onhover";
import { InputWithFloatingLabel } from "../ui/inputs/input-floating-label";
import { formatToCreditCardNumber } from "../../utils/formatters/credit-card-number-autoformat";
import { excludeAllLetters } from "../../utils/formatters/exclude-all-letters";
import { showNotification } from "@mantine/notifications";
import debounce from "../../utils/debounce/debounce";

const useStyles = createStyles((theme) => ({
  modal: {
    border: `1px solid ${theme.colors.gray[2]}`,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.xl,
    position: "relative",
  },
}));

export const CardPaymentModal = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

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
    const errors = Object.keys(form.errors);
    return !cardNumber || !expDate || !cvv || !amount || errors.length > 0;
  };

  const cardNumberInputProps = {
    ...form.getInputProps("cardNumber"),
    onChange: (e) => {
      const formatted = formatToCreditCardNumber(
        excludeAllLetters(e.target.value)
      );
      form.getInputProps("cardNumber").onChange(formatted);
    },
    type: "tel",
  };

  const amountInputProps = {
    ...form.getInputProps("amount"),
    onChange: (e) => {
      const formatted = excludeAllLetters(e.target.value);
      form.getInputProps("amount").onChange(formatted);
    },
    type: "tel",
  };

  const pay = (values) => {
    setIsLoading(true);
    debounce(() => {
      axios
        .post("./api/payments/card", values)
        .then((res) => {
          showNotification({
            title: "Hey, you've got a response!",
            message: JSON.stringify(res.data, false, 1),
          });
        })
        .catch((e) => {
          showNotification({
            title: "Error processing your request!",
            message: e.message,
            color: "red",
          });
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };

  return (
    <form onSubmit={form.onSubmit((values) => pay(values))}>
      <Stack className={classes.modal}>
        <LoadingOverlay visible={isLoading} style={{ zIndex: 9999 }} />
        <Title order={1}>Enter your credentials. 💰</Title>
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
          <ButtonGradientOnHover isDisabled={handleButtonDisabling()}>
            PAY
          </ButtonGradientOnHover>
        </Group>
      </Stack>
    </form>
  );
};
