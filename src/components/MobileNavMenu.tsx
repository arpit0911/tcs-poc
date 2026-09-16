import React from "react";
import {
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  Button,
  makeStyles,
} from "@fluentui/react-components";
// import { Menu as MenuIcon } from "lucide-react";
import { NavigationFilled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "none",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
});

export const MobileNavMenu: React.FC = () => {
  const styles = useStyles();

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
