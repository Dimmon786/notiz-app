import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getNotes, saveNote } from './storage/noteStorage';

const CreateNotePage = () => {
  const router = useRouter(); // Verwende den useRouter Hook von expo-router
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isImportant, setImportant] = useState(false);

  // Funktion zum Speichern der Notiz
  const handleSaveNote = async () => {
    const note = {
      id: new Date().toISOString(),
      title,
      body,
      isImportant,
    };
    await saveNote(note);
    router.back(); // Zur vorherigen Seite navigieren
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neue Notiz erstellen</Text>

      {/* Eingabefeld für den Titel der Notiz */}
      <TextInput
        style={styles.input}
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
      />

      {/* Eingabefeld für den Inhalt der Notiz */}
      <TextInput
        style={styles.textArea}
        placeholder="Notizinhalt"
        value={body}
        onChangeText={setBody}
        multiline
      />

      {/* Umschaltfeld für wichtige Notizen */}
      <View style={styles.toggleContainer}>
        <Text>Wichtig:</Text>
        <TouchableOpacity
          style={[styles.toggleButton, isImportant && styles.toggleButtonActive]}
          onPress={() => setImportant(!isImportant)}
        >
          <Text style={styles.toggleButtonText}>{isImportant ? 'Ja' : 'Nein'}</Text>
        </TouchableOpacity>
      </View>

      {/* Speicherbutton */}
      <Button title="Speichern" onPress={handleSaveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  textArea: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
  },
  toggleButtonActive: {
    backgroundColor: '#007AFF',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noteCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  importantLabel: {
    color: 'red',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default CreateNotePage;