import { StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';

export const useGlobalStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.colors.background as string,
      paddingHorizontal: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    card: {
      backgroundColor: theme.colors.surface as string,
      borderRadius: theme.radius.lg,
      padding: theme.spacing(2),
      borderWidth: 1,
      borderColor: theme.colors.border as string,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border as string,
      borderRadius: theme.radius.md,
      padding: theme.spacing(1.5),
      backgroundColor: theme.colors.surface as string,
      color: theme.colors.text as string,
    },
    button: {
      backgroundColor: theme.colors.primary as string,
      paddingVertical: theme.spacing(1.5),
      paddingHorizontal: theme.spacing(2),
      borderRadius: theme.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
    searchBar: {
      backgroundColor: theme.colors.surface as string,
      borderRadius: theme.radius.lg,
      paddingHorizontal: theme.spacing(2),
      paddingVertical: theme.spacing(1.25),
      borderWidth: 1,
      borderColor: theme.colors.border as string,
    },
  });
};
