import React from "react";
import { Field } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  useController,
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";

interface FormDateProps {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
  placeholder?: string;
}

export const FormDate: React.FC<FormDateProps> = ({
  name,
  label,
  required,
  rules,
  placeholder,
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    rules: {
      required: required ? `${label} is required` : false,
      ...rules,
    },
  });

  // 1. Parses background Redux data (YYYY-MM-DD) into a Date Object
  const parseLocalDate = (dateStr?: string): Date | undefined => {
    if (!dateStr) return undefined;
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[0]),
        parseInt(parts[1]) - 1,
        parseInt(parts[2]),
      );
    }
    return new Date(dateStr);
  };

  const minDateString =
    rules?.min && typeof rules.min === "object"
      ? (rules.min.value as string | undefined)
      : (rules?.min as string | undefined);
  const minDateObj = parseLocalDate(minDateString);
  const pickerValue = field.value ? parseLocalDate(field.value) : undefined;

  // 2. Formats Date Object to Display as DD/MM/YYYY
  const onFormatDate = (date?: Date): string => {
    if (!date) return "";
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  // 3. Parses manual keyboard input (DD/MM/YYYY) into a Date Object
  const onParseDateFromString = (value: string): Date | null => {
    const parts = value.split("/");
    if (parts.length === 3) {
      const dd = parseInt(parts[0], 10);
      const mm = parseInt(parts[1], 10) - 1; // Months are 0-indexed
      const yyyy = parseInt(parts[2], 10);

      const parsedDate = new Date(yyyy, mm, dd);
      // Validate it's a real date (e.g., prevents 31/02/2026)
      if (
        parsedDate.getFullYear() === yyyy &&
        parsedDate.getMonth() === mm &&
        parsedDate.getDate() === dd
      ) {
        return parsedDate;
      }
    }
    return null; // Return null if user types invalid format
  };

  return (
    <Field
      label={label}
      required={required}
      validationState={fieldState.error ? "error" : "none"}
      validationMessage={fieldState.error?.message}
    >
      <DatePicker
        {...field}
        ref={field.ref}
        name={field.name}
        onBlur={field.onBlur}
        value={pickerValue}
        minDate={minDateObj}
        // Pass the formatting and parsing functions
        formatDate={onFormatDate}
        parseDateFromString={onParseDateFromString}
        placeholder={placeholder}
        onSelectDate={(date) => {
          if (date) {
            // Keep the background data standardized to YYYY-MM-DD
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            field.onChange(`${yyyy}-${mm}-${dd}`);
          } else {
            field.onChange("");
          }
        }}
      />
    </Field>
  );
};
