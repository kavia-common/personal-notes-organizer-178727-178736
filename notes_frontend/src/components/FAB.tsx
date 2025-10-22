import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../theme/theme';

// PUBLIC_INTERFACE
export default function FAB({
  onPress,
  label = '+',
  style,
}: {
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
}) {
  /** Floating action button used to create a new note */
  const theme = useTheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.9}
      style={[styles.base, { backgroundColor: theme.colors.primary as string }, theme.shadow.md, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    marginTop: -3,
    fontWeight: '600',
  },
});
