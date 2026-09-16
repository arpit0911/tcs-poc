import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { DesktopNavLinks } from "./DesktopNavLinks";
import { MobileNavMenu } from "./MobileNavMenu";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";

const useStyles = makeStyles({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: tokens.shadow4,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "bold",
    color: tokens.colorBrandForeground1,
    marginRight: "24px",
  },
});

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const styles = useStyles();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <MobileNavMenu />
        <div className={styles.brandName}>MyApp</div>
        <DesktopNavLinks />
      </div>

      <div className={styles.rightSection}>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        <UserProfile />
      </div>
    </nav>
  );
};
