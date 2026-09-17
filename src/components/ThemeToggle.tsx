import React from "react";
import { Button } from "@fluentui/react-components";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleTheme } from "../store/slices/themeSlice";


export const ThemeToggle: React.FC = () => {
  const isDark = useAppSelector((state) => state.theme.isDark);
  const dispatch = useAppDispatch();
  return (
    <Button
      icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
      appearance="subtle"
      onClick={() => dispatch(toggleTheme())}
      title="Toggle Theme"
    />
  );
};
