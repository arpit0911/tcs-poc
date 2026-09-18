import { makeStyles } from '@fluentui/react-components';

export const useMobileNavStyles = makeStyles({
  container: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
});