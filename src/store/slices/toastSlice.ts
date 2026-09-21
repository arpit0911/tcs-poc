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
    // Adds a new toast to the global queue
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.queue.push(action.payload);
    },
    // Removes the oldest toast from the queue after it is displayed
    shiftToast: (state) => {
      state.queue.shift();
    },
  },
});

export const { showToast, shiftToast } = toastSlice.actions;
export default toastSlice.reducer;
