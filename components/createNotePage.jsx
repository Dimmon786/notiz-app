import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNotes, saveNote } from './storage/noteStorage';


const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes();
      setNotes(savedNotes);
    };
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notizen</Text>
      {notes.length === 0 ? (
        <Text>Keine Notizen vorhanden</Text>
      ) : (
        notes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text>{note.body}</Text>
            {note.isImportant && <Text style={styles.importantLabel}>Wichtig!</Text>}
          </View>
        ))
      )}
    </View>
  );
};

const CreateNotePage = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isImportant, setImportant] = useState(false);

  const handleSaveNote = async () => {
    const note = {
      id: new Date().toISOString(),
      title,
      body,
      isImportant,
    };
    await saveNote(note);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Neue Notiz erstellen</Text>

      <TextInput
        style={styles.input}
        placeholder="Titel"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Notizinhalt"
        value={body}
        onChangeText={setBody}
        multiline
      />

      <View style={styles.toggleContainer}>
        <Text>Wichtig:</Text>
        <TouchableOpacity
          style={[styles.toggleButton, isImportant && styles.toggleButtonActive]}
          onPress={() => setImportant(!isImportant)}
        >
          <Text style={styles.toggleButtonText}>{isImportant ? 'Ja' : 'Nein'}</Text>
        </TouchableOpacity>
      </View>

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
});

export { HomePage, CreateNotePage };