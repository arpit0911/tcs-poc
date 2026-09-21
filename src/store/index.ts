import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import userReducer from "./slices/userSlice";
import shipmentReducer from "./slices/shipmentSlice";
import toastReducer from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    shipments: shipmentReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
