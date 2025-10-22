import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotesList from '../screens/NotesList';
import NoteEditor from '../screens/NoteEditor';

export type RootStackParamList = {
  NotesList: undefined;
  NoteEditor: { id?: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// PUBLIC_INTERFACE
export default function Navigator() {
  /** Navigator for the app with two screens: list and editor. */
  return (
    <Stack.Navigator
      initialRouteName="NotesList"
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="NotesList"
        component={NotesList}
        options={{ title: 'My Notes' }}
      />
      <Stack.Screen
        name="NoteEditor"
        component={NoteEditor}
        options={({ route }) => ({
          title: route.params?.id ? 'Edit Note' : 'New Note',
        })}
      />
    </Stack.Navigator>
  );
}
