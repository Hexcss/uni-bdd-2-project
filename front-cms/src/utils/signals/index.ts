import { signal } from "@preact/signals-react";

export const isDrawerClose = signal(false);

export const snackbar = signal({
    open: false,
    message: '',
    severity: 'info',
})