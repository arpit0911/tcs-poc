import React from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { Navbar } from "./components/Navbar/Navbar";
import { useAppSelector } from "./store/hooks";
import { useAppStyles } from "./App.styles";

const App: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const styles = useAppStyles();

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div className={styles.appContainer}>
        <Navbar />

        <main className={styles.mainContent}>
          <h1>Architecture Updated</h1>
          <p>
            All components now strictly separate their UI logic from their
            Griffel styles!
          </p>
        </main>
      </div>
    </FluentProvider>
  );
};

export default App;
