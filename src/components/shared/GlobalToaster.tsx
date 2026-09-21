import React, { useEffect } from "react";
import {
  Toaster,
  useToastController,
  useId,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { shiftToast } from "../../store/slices/toastSlice";

export const GlobalToaster: React.FC = () => {
  const toasterId = useId("global-toaster");
  const { dispatchToast } = useToastController(toasterId);

  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.queue);

  useEffect(() => {
    // If there is a toast in the queue, display it
    if (toasts.length > 0) {
      const currentToast = toasts[0];

      dispatchToast(
        <Toast>
          <ToastTitle>{currentToast.title || "Notification"}</ToastTitle>
          {currentToast.message && (
            <ToastBody>{currentToast.message}</ToastBody>
          )}
        </Toast>,
        { intent: currentToast.intent || "info" },
      );

      // Instantly remove it from Redux so it doesn't fire again
      dispatch(shiftToast());
    }
  }, [toasts, dispatchToast, dispatch]);

  // Renders the hidden mounting point for Fluent UI's toast popups
  return <Toaster toasterId={toasterId} position="top-end" />;
};
