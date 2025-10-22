import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/theme';
import { Note } from '../db/database';

// PUBLIC_INTERFACE
export default function NoteItem({
  note,
  onPress,
  onDelete,
}: {
  note: Note;
  onPress: () => void;
  onDelete: () => void;
}) {
  /** Renders a single note entry with title, date, and delete */
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.container, { borderColor: theme.colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.colors.text }]} numberOfLines={1}>
          {note.title || 'Untitled'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.muted as string }]} numberOfLines={2}>
          {note.content}
        </Text>
        <Text style={[styles.date, { color: theme.colors.muted as string }]} numberOfLines={1}>
          {new Date(note.updated_at || note.created_at || '').toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onDelete}
        accessibilityLabel="Delete note"
        style={[styles.deleteBtn, { backgroundColor: theme.colors.error as string }]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    marginTop: 6,
  },
  deleteBtn: {
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
