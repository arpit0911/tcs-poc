import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ToastPayload {
  title?: string;
  message: string;
  intent?: "success" | "warning" | "error" | "info";
}

interface ToastState {
  queue: ToastPayload[];
}

const initialState: ToastState = {
  queue: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.queue.push(action.payload);
    },
    shiftToast: (state) => {
      state.queue.shift();
    },
  },
});

export const { showToast, shiftToast } = toastSlice.actions;
export default toastSlice.reducer;
