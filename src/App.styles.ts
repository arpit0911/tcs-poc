import { makeStyles, tokens } from "@fluentui/react-components";

export const useAppStyles = makeStyles({
  appContainer: {
    minHeight: "100vh",
    fontFamily: tokens.fontFamilyBase,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  mainContent: { padding: tokens.spacingVerticalXL },
});
