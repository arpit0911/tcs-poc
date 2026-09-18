import React from "react";
import { FormInput } from "../../shared/FormInput";
import { FormSelect } from "../../shared/FormSelect";

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
export const SenderDetailsTab: React.FC = () => (
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
      appearance="filled-lighter"
      required
    />
  </>
);

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
      appearance="filled-lighter"
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
      placeholder="2.0"
      type="number"
      required
    />
    <FormInput
      name="parcel.size"
      label="Size (L x W x H)"
      type="text"
      placeholder="2 x 3 x 4"
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
