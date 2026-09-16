import React from "react";
import { Avatar } from "@fluentui/react-components";

export const UserProfile: React.FC = () => {
  return (
    <Avatar
      name="John Doe"
      color="brand"
      badge={{ status: "available" }}
      aria-label="User Profile"
    />
  );
};
