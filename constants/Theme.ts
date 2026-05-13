import { MD3LightTheme } from 'react-native-paper';
import { Colors } from './Colors';

export const AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    primaryContainer: '#C8E6C9',
    secondary: Colors.secondary,
    secondaryContainer: '#FFE0B2',
    surface: Colors.surface,
    surfaceVariant: '#F5F5F0',
    background: Colors.background,
    error: Colors.error,
    onPrimary: Colors.textInverse,
    onSecondary: Colors.text,
    onSurface: Colors.text,
    onBackground: Colors.text,
    outline: Colors.border,
  },
};
