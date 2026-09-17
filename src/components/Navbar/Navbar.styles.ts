import { makeStyles, tokens } from "@fluentui/react-components";

export const useNavbarStyles = makeStyles({
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  brandName: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    margin: `0 ${tokens.spacingHorizontalXL} 0 0`,
  },
});
