import React from "react";
import { Field, Input } from "@fluentui/react-components";
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
}

export const FormDate: React.FC<FormDateProps> = ({
  name,
  label,
  required,
  rules,
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

  return (
    <Field
      label={label}
      required={required}
      validationState={fieldState.error ? "error" : "none"}
      validationMessage={fieldState.error?.message}
    >
      <Input {...field} type="date" />
    </Field>
  );
};
