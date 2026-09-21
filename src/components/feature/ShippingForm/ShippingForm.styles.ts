import { makeStyles, tokens } from "@fluentui/react-components";

export const useShippingStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gap: tokens.spacingHorizontalXXL,
    maxWidth: "1200px",
    alignItems: "start",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    boxShadow: tokens.shadow4,
    width: "100%",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: `0 0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium}`,
    marginTop: tokens.spacingVerticalM,
  },
  previewCard: {
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
  },
  previewGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalS,
  },
  actionContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalM,
  },
  primaryButton: {
    marginTop: tokens.spacingVerticalM,
  },
});
