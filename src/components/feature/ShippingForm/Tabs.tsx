import React from "react";
import { FormInput } from "../../shared/FormInput";
import { FormSelect } from "../../shared/FormSelect";
import { FormDate } from "../../shared/FormDate";

const contactValidationRules = {
  minLength: {
    value: 10,
    message: "Contact must be at least 10 digits",
  },
  maxLength: {
    value: 15,
    message: "Contact cannot exceed 15 digits",
  },
  pattern: {
    value: /^[0-9+]+$/,
    message: "Only numbers and '+' are allowed",
  },
};

const emailValidationRules = {
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address",
  },
};
export const SenderDetailsTab: React.FC = () => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  return (
    <>
      <FormInput
        name="sender.fullName"
        label="Sender Full Name"
        placeholder="John Doe"
        required
      />
      <FormInput
        name="sender.email"
        label="Sender Email"
        placeholder="john.doe@company.com"
        type="email"
        required
        hint="We will send the tracking receipt here."
        rules={{
          ...emailValidationRules,
        }}
      />
      <FormInput
        name="sender.contact"
        label="Contact"
        placeholder="+91 1234567890"
        required
        rules={{ ...contactValidationRules }}
      />
      <FormInput
        name="sender.address"
        label="Address"
        placeholder="AB/2 - 123, Street Name, City, State, ZIP"
        required
      />
      <FormDate
        name="sender.requestedDate"
        label="Expected Delivery Date"
        placeholder="YYYY/MM/DD"
        rules={{
          min: {
            value: today,
            message: "Expected delivery date cannot be in the past",
          },
        }}
      />
    </>
  );
};

export const ReceiverDetailsTab: React.FC = () => (
  <>
    <FormInput
      name="receiver.fullName"
      label="Receiver Full Name"
      placeholder="John Doe"
      required
    />
    <FormInput
      name="receiver.email"
      label="Email"
      placeholder="john.doe@company.com"
      type="email"
      required
      hint="We will send the tracking receipt here."
      rules={{
        ...emailValidationRules,
      }}
    />
    <FormInput
      name="receiver.contact"
      label="Contact"
      placeholder="+91 1234567890"
      required
      rules={{
        ...contactValidationRules,
      }}
    />
    <FormInput
      name="receiver.address"
      label="Address"
      placeholder="AB/2 - 123, Street Name, City, State, ZIP"
      required
    />
  </>
);

export const ParcelDetailsTab: React.FC = () => (
  <>
    <FormSelect
      name="parcel.type"
      label="Type of Parcel"
      required
      options={[
        { label: "Document", value: "document" },
        { label: "Box", value: "box" },
        { label: "Fragile", value: "fragile" },
      ]}
    />
    <FormInput
      name="parcel.weight"
      label="Estimated Weight (kg)"
      placeholder="e.g., 2.5"
      type="number"
      required
      rules={{
        pattern: {
          value: /^(0*[1-9]\d*(\.\d+)?|0+\.\d*[1-9]\d*)$/,
          message: "Weight must be a positive number greater than 0",
        },
        max: {
          value: 2000,
          message: "Weight cannot exceed 2000 kg",
        },
      }}
    />
    <FormInput
      name="parcel.size"
      label="Dimensions (L x W x H in cm)"
      type="text"
      placeholder="e.g., 10x15x20"
      rules={{
        pattern: {
          value: /^\d+(\.\d+)?\s*[xX]\s*\d+(\.\d+)?\s*[xX]\s*\d+(\.\d+)?$/,
          message: "Format must be L x W x H (e.g., 10x15x20)",
        },
      }}
    />
    <FormSelect
      name="parcel.transport"
      label="Transport Type"
      required
      options={[
        { label: "Standard (Ground)", value: "ground" },
        { label: "Express (Air)", value: "air" },
      ]}
    />
    <FormInput
      name="parcel.remark"
      label="Remark"
      type="text"
      placeholder="Additional Information"
    />
  </>
);
