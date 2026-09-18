import React from "react";
import { DesktopNavLinks } from "./DesktopNavLinks";
import { MobileNavMenu } from "./MobileNavMenu";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";
import { useNavbarStyles } from "./Navbar.styles";

export const Navbar: React.FC = () => {
  const styles = useNavbarStyles();

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <MobileNavMenu />
        <div className={styles.brandName}>MyApp</div>
        <DesktopNavLinks />
      </div>

      <div className={styles.rightSection}>
        <ThemeToggle />
        <UserProfile />
      </div>
    </nav>
  );
};
