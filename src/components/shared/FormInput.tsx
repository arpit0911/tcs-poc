import React from "react";
import { Field, Input } from "@fluentui/react-components";
import {
  useController,
  useFormContext,
  type RegisterOptions,
} from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "number";
  rules?: RegisterOptions;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  readOnly?: boolean;
  appearance?: "outline" | "underline" | "filled-darker" | "filled-lighter";
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required,
  type = "text",
  rules,
  placeholder,
  hint,
  disabled,
  readOnly,
  appearance = "outline",
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
      hint={hint}
      validationState={fieldState.error ? "error" : "none"}
      validationMessage={fieldState.error?.message}
    >
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        appearance={appearance}
      />
    </Field>
  );
};
