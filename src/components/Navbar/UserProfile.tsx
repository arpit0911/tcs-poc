import React from "react";
import { Avatar } from "@fluentui/react-components";
import { useAppSelector } from "../../store/hooks";

export const UserProfile: React.FC = () => {
  const { name, status } = useAppSelector((state) => state.user);

  return (
    <Avatar
      name={name}
      color="brand"
      badge={{ status }}
      aria-label="User Profile"
    />
  );
};
