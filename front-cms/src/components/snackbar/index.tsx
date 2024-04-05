import React, { useCallback } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";
import { useSignals } from "@preact/signals-react/runtime";
import { snackbar } from "../../utils/signals";

const SiteSnackbar: React.FC = () => {
  useSignals();

  const { open, message, severity } = snackbar.value;

  const handleClose = useCallback(() => {
    snackbar.value = {
      open: false,
      message: "",
      severity: "info",
    }
  }, []);

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity as AlertColor}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SiteSnackbar;
