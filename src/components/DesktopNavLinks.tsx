import React from 'react';
import { Button, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    gap: '8px',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
});

export const DesktopNavLinks: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Button appearance="subtle">Home</Button>
      <Button appearance="subtle">Dashboard</Button>
      <Button appearance="subtle">Settings</Button>
    </div>
  );
};