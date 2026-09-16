import React, { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
} from "@fluentui/react-components";
import { Navbar } from "./components/Navbar";

const useStyles = makeStyles({
  appContainer: {
    padding: 0,
    fontFamily: "Segoe UI, sans-serif",
  },
  mainContent: {
    padding: "24px",
  },
});

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const styles = useStyles();

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div
        className={styles.appContainer}
        style={{ backgroundColor: isDark ? "#242424" : "#faf9f8" }}
      >
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />

        <main className={styles.mainContent}>
          <h1>Welcome to Fluent UI v9</h1>
          <p>
            This layout is fully responsive. Resize the window to see the mobile
            menu in action!
          </p>
        </main>
      </div>
    </FluentProvider>
  );
};

export default App;
