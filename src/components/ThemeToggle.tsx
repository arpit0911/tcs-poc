import React from "react";
import { Button } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  toggleTheme,
}) => {
  return (
    <Button
      icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
      appearance="subtle"
      onClick={toggleTheme}
      title="Toggle Theme"
    />
  );
};
