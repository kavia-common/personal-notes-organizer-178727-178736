import React, { createContext, useContext } from 'react';

export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
  };
  spacing: (v: number) => number;
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadow: {
    sm: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      shadowOffset: { width: number; height: number };
      elevation: number;
    };
    md: {
      shadowColor: string;
      shadowOpacity: number;
      shadowRadius: number;
      shadowOffset: { width: number; height: number };
      elevation: number;
    };
  };
};

const OceanProfessional: Theme = {
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
  },
  spacing: (v: number) => v * 8,
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  },
};

const ThemeContext = createContext<Theme>(OceanProfessional);

// PUBLIC_INTERFACE
export const useTheme = (): Theme => {
  /** Hook to access the Ocean Professional theme object. */
  return useContext(ThemeContext);
};

// PUBLIC_INTERFACE
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  /** Provides Ocean Professional theme to the app. */
  return React.createElement(ThemeContext.Provider, { value: OceanProfessional }, children);
};
