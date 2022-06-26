import React from "react";
import { createStyles, TextInput } from "@mantine/core";
import { formatExpirationDate } from "../../../utils/formatters/expiration-date-autoformat";
import { IoIosClose } from "react-icons/io";

const useStyles = createStyles((theme, { floating }) => ({
  root: {
    position: "relative",
  },
  label: {
    position: "absolute",
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: "none",
    color: floating
      ? theme.colorScheme === "dark"
        ? theme.white
        : theme.black
      : theme.colorScheme === "dark"
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: "transform 150ms ease, color 150ms ease, font-size 150ms ease",
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : "none",
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },
  required: {
    transition: "opacity 150ms ease",
    opacity: floating ? 1 : 0,
  },

  input: {
    "&::placeholder": {
      transition: "color 150ms ease",
      color: !floating ? "transparent" : undefined,
    },
    boxShadow: theme.shadows.xs,
  },
}));

export const InputWithFloatingLabel = ({
  label = "Floating label",
  placeholder = "OMG, it also has a placeholder",
  required = true,
  autoComplete = "nope",
  w = "100%",
  type = "text",
  formInputProps,
  maxLength,
}) => {
  const [focused, setFocused] = React.useState(false);
  const { classes } = useStyles({
    floating: focused,
  });

  const inputsConfig = {
    label: label,
    placeholder: placeholder,
    required: required,
    classNames: classes,
    mt: "md",
    autoComplete: autoComplete,
    style: { width: w },
    ...formInputProps,
  };

  if (type === "text") {
    return (
      <TextInput
        {...inputsConfig}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(inputsConfig.value.length > 0)}
        maxLength={maxLength}
        rightSection={
          <IoIosClose
            onClick={() => {
              inputsConfig.onChange({ target: { value: "" } });
            }}
            style={{ cursor: "pointer" }}
          />
        }
      />
    );
  }

  if (type === "expiration-date") {
    inputsConfig.onChange = undefined;
    return (
      <TextInput
        {...inputsConfig}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(inputsConfig.value.length > 0)}
        onChange={(event) =>
          formInputProps.onChange(formatExpirationDate(event.target.value))
        }
        type="tel"
        rightSection={
          <IoIosClose
            onClick={() => {
              formInputProps.onChange("");
            }}
            style={{ cursor: "pointer" }}
          />
        }
      />
    );
  }

  if (type === "number") {
    return (
      <TextInput
        {...inputsConfig}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(inputsConfig.value.length > 0)}
        hidecontrols="true"
        type="tel"
        maxLength={maxLength}
        rightSection={
          <IoIosClose
            onClick={() => {
              inputsConfig.onChange("");
            }}
            style={{ cursor: "pointer" }}
          />
        }
      />
    );
  }
};
