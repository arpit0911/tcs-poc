import { DatePicker } from "@fluentui/react-datepicker-compat";
import { useAppDispatch } from "../../../store/hooks";
import {
  updateEstimatedDate,
  updateShipmentStatus,
  type ShipmentRecord,
} from "../../../store/slices/shipmentSlice";
import React from "react";

const getLocalToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

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

  const todayStr = getLocalToday();

  const minDateStr =
    item.estimatedDate > todayStr ? item.estimatedDate : todayStr;

  const minDateObj = parseLocalDate(minDateStr);
  const pickerValue = tempDateStr ? parseLocalDate(tempDateStr) : undefined;

  return (
    <div>
      <DatePicker
        value={pickerValue}
        minDate={minDateObj}
        placeholder="Select new date..."
        formatDate={(date) => {
          if (!date) return "";
          return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
        }}
        onSelectDate={(date) => {
          if (date) {
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            const newDateString = `${yyyy}-${mm}-${dd}`;
            setTempDateStr(newDateString);
            dispatch(updateEstimatedDate({ id: item.id, date: newDateString }));
            dispatch(
              updateShipmentStatus({ id: item.id, status: "Rescheduled" }),
            );
          }
        }}
      />
    </div>
  );
};
