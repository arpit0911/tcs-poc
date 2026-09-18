import React from "react";
import { Field, Select } from "@fluentui/react-components";
import { useController, useFormContext } from "react-hook-form";

interface FormSelectProps {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  required,
}) => {
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    rules: { required: required ? `${label} is required` : false },
  });

  return (
    <Field
      label={label}
      required={required}
      validationState={fieldState.error ? "error" : "none"}
      validationMessage={fieldState.error?.message}
    >
      <Select {...field}>
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>
    </Field>
  );
};
