import { makeStyles, tokens } from '@fluentui/react-components';

export const useDesktopNavStyles = makeStyles({
  container: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
});