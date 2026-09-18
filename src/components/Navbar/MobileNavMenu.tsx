import React from "react";
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Button,
} from "@fluentui/react-components";
import { NavigationFilled } from "@fluentui/react-icons";
import { useMobileNavStyles } from "./MobileNavMenu.styles";

export const MobileNavMenu: React.FC = () => {
  const styles = useMobileNavStyles();

  return (
    <div className={styles.container}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button icon={<NavigationFilled />} appearance="subtle" />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>Home</MenuItem>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
