import * as Yup from "yup";
import valid from "card-validator";

export const CreditCardValidationSchema = Yup.object().shape({
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
      "Date is invalid",
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
