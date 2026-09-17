import React from "react";
import { Button } from "@fluentui/react-components";
import { useDesktopNavStyles } from "./DesktopNavLinks.styles";

export const DesktopNavLinks: React.FC = () => {
  const styles = useDesktopNavStyles();

  return (
    <div className={styles.container}>
      <Button appearance="subtle">Home</Button>
      <Button appearance="subtle">Dashboard</Button>
      <Button appearance="subtle">Settings</Button>
    </div>
  );
};
