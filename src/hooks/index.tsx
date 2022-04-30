import React, { ReactNode } from 'react';

import { theme } from '../styles/theme';

import { ThemeProvider, CssBaseline } from '@mui/material';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
