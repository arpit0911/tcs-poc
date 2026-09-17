import React from 'react';
import { FluentProvider, webLightTheme, webDarkTheme, makeStyles } from '@fluentui/react-components';
import { Navbar } from './components/Navbar';
import { useAppSelector } from './store/hooks';


const useStyles = makeStyles({
  appContainer: {
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  mainContent: {
    padding: '24px',
  },
});

const App: React.FC = () => {
  // Consume the theme from Redux
  const isDark = useAppSelector((state) => state.theme.isDark);
  const styles = useStyles();

  return (
    <FluentProvider theme={isDark ? webDarkTheme : webLightTheme}>
      <div className={styles.appContainer} style={{ backgroundColor: isDark ? '#242424' : '#faf9f8' }}>
        <Navbar />
        
        <main className={styles.mainContent}>
          <h1>Redux Toolkit Integrated</h1>
          <p>The theme toggle and user profile are now powered by Redux global state!</p>
        </main>
      </div>
    </FluentProvider>
  );
};

export default App;