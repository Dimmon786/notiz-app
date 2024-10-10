import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getNotes, deleteNote } from "./storage/noteStorage";
import { useRouter } from 'expo-router';

const AllNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const[selectedNotes, setSelectedNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const savedNotes = await getNotes();
            setNotes(savedNotes);
        };
        fetchNotes();
    }, []);

    const toggleSelectNote = (noteId) => {
        if (selectedNotes.includes(noteId)) {
          setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
        } else {
          setSelectedNotes([...selectedNotes, noteId]);
        }
      };

      const handleDeletedNotes = async () => {
        const updateNotes = notes.filter((note) => !selectedNotes.includes(note.id));
        setNotes(updateNotes);
        setSelectedNotes([]);

        for (const noteId of selectedNotes) {
            await handleDeletedNotes(notteId);
        }
      };

return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Alle Notizen</Text>
        {notes.length === 0 ? (
            <Text style={styles.noNotesText}>Keine Notizen vorhanden</Text>
        ) : (
            notes.map((note) => (
                <View key={note.id} style={styles.noteCard}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Text>{note.body}</Text>
                    {note.isImportant && <Text style={styles.importantLablel}>Wichtig!</Text>}
                </View>
            ))
        )}
    </ScrollView>
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
    noNotesText: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
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
    importantLablel: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default AllNotesPage;