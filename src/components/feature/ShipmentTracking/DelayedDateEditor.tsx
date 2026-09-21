import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateEstimatedDate,
  updateShipmentStatus,
  type ShipmentRecord,
} from "../../../store/slices/shipmentSlice";
import React from "react";

// Helper to get local date string YYYY-MM-DD
const getLocalToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

// Helper to parse YYYY-MM-DD to Date object
const parseLocalDate = (dateStr: string) => {
  const parts = dateStr.split("-");
  return new Date(
    parseInt(parts[0]),
    parseInt(parts[1]) - 1,
    parseInt(parts[2]),
  );
};

export const DelayedDateEditor: React.FC<{ item: ShipmentRecord }> = ({
  item,
}) => {
  const dispatch = useAppDispatch();
  const [tempDateStr, setTempDateStr] = React.useState(item.estimatedDate);

  const minDateStr = getLocalToday();
  const minDateObj = parseLocalDate(minDateStr);
  const pickerValue = tempDateStr ? parseLocalDate(tempDateStr) : undefined;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempDateStr < minDateStr) {
        alert("Rescheduled date cannot be in the past.");
        return;
      }
      dispatch(updateEstimatedDate({ id: item.id, date: tempDateStr }));
      dispatch(updateShipmentStatus({ id: item.id, status: "Rescheduled" }));
    }
  };

  return (
    <div onKeyDown={handleKeyDown} title="Press Enter to save">
      <DatePicker
        value={pickerValue}
        minDate={minDateObj}
        placeholder="Select new date..."
        // Format display to DD/MM/YYYY for consistency
        formatDate={(date) => {
          if (!date) return "";
          return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
        }}
        onSelectDate={(date) => {
          if (date) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            setTempDateStr(`${yyyy}-${mm}-${dd}`);
            dispatch(updateEstimatedDate({ id: item.id, date: tempDateStr }));
            dispatch(
              updateShipmentStatus({ id: item.id, status: "Rescheduled" }),
            );
          }
        }}
      />
    </div>
  );
};
