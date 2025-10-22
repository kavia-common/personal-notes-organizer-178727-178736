import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/theme';
import { useGlobalStyles } from '../styles/global';
import FAB from '../components/FAB';
import NoteItem from '../components/NoteItem';
import { initDB, getNotes, deleteNote, Note } from '../db/database';

type Props = NativeStackScreenProps<RootStackParamList, 'NotesList'>;

export default function NotesList({ navigation }: Props) {
  const theme = useTheme();
  const g = useGlobalStyles();
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    setRefreshing(true);
    await initDB();
    const all = await getNotes();
    setNotes(all);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      load();
    });
    load();
    return unsubscribe;
  }, [navigation, load]);

  const filtered = notes.filter((n) =>
    (n.title || '').toLowerCase().includes(search.toLowerCase())
  );

  async function handleDelete(id?: number) {
    if (!id) return;
    await deleteNote(id);
    await load();
  }

  return (
    <View style={g.screen}>
      <View style={{ marginBottom: 12 }}>
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={theme.colors.muted as string}
          value={search}
          onChangeText={setSearch}
          style={g.searchBar}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} />}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('NoteEditor', { id: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: theme.colors.muted as string }}>
            No notes yet. Tap + to create your first note.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <FAB onPress={() => navigation.navigate('NoteEditor')} />
    </View>
  );
}
