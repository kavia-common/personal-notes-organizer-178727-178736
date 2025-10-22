import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/index';
import { ThemeProvider } from './src/theme/theme';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
