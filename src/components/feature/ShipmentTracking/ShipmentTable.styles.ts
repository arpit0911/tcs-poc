import { makeStyles, tokens } from '@fluentui/react-components';

export const useTableStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow2,
    marginTop: tokens.spacingVerticalXL,
  },
  headerCell: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  statusBadgeActive: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  statusBadgePending: {
    color: tokens.colorPaletteMarigoldForeground1,
    fontWeight: tokens.fontWeightSemibold,
  }
});