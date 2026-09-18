import React from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
} from "@fluentui/react-components";
import { Navbar } from "./components/Navbar/Navbar";
import { useAppSelector } from "./store/hooks";
import { useAppStyles } from "./App.styles";
import { ShippingForm } from "./components/feature/ShippingForm/ShippingForm";
import { ShipmentTable } from "./components/feature/ShipmentTracking/ShipmentTable";

const App: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const styles = useAppStyles();

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div className={styles.appContainer}>
        <Navbar />

        <main className={styles.mainContent}>
          <ShippingForm />
          <ShipmentTable />
        </main>
      </div>
    </FluentProvider>
  );
};

export default App;
