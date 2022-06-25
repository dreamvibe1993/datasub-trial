import { Button, createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme) => ({
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
  modalSubmitButtonLabel: {
    position: "absolute",
    zIndex: 9999,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export const ButtonGradientOnHover = ({ isDisabled, children }) => {
  const { classes } = useStyles();

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      className={isDisabled ? null : classes.modalSubmitButton}
    >
      <div className={classes.modalSubmitButtonLabel}>{children}</div>
      <span style={{ opacity: 0 }}>{children}</span>
      <div className={isDisabled ? null : classes.modalSubmitButtonGradient} />
    </Button>
  );
};
