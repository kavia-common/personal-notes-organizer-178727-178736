import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, TextInput, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../theme/theme';
import { useGlobalStyles } from '../styles/global';
import { createNote, getNoteById, updateNote } from '../db/database';
import { TouchableOpacity, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'NoteEditor'>;

export default function NoteEditor({ navigation, route }: Props) {
  const theme = useTheme();
  const g = useGlobalStyles();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isEditing = !!route.params?.id;

  useEffect(() => {
    (async () => {
      if (route.params?.id) {
        const n = await getNoteById(route.params.id);
        if (n) {
          setTitle(n.title);
          setContent(n.content);
        }
      }
    })();
  }, [route.params?.id]);

  async function onSave() {
    const trimmedTitle = title.trim() || 'Untitled';
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      Alert.alert('Empty note', 'Please add some content for your note.');
      return;
    }
    if (isEditing && route.params?.id) {
      await updateNote(route.params.id, { title: trimmedTitle, content: trimmedContent });
    } else {
      await createNote({ title: trimmedTitle, content: trimmedContent });
    }
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={onSave}
          style={[g.button, { backgroundColor: theme.colors.secondary as string, paddingHorizontal: 14, borderRadius: 999 }]}
        >
          <Text style={g.buttonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, title, content, isEditing]);

  return (
    <View style={[g.screen, { gap: 12 }]}>
      <TextInput
        placeholder="Title"
        placeholderTextColor={theme.colors.muted as string}
        style={[g.input, { fontSize: 18, fontWeight: '700' }]}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Write your note..."
        placeholderTextColor={theme.colors.muted as string}
        style={[g.input, { height: 300, textAlignVertical: 'top' }]}
        multiline
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
}
