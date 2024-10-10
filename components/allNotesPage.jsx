import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from "react-native";
import { getNotes, deleteNote } from "./storage/noteStorage";
import { useRouter } from 'expo-router';

const AllNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const router = useRouter(); // Router zum Navigieren zu anderen Seiten verwenden

    // Beim ersten Rendern alle gespeicherten Notizen abrufen
    useEffect(() => {
        const fetchNotes = async () => {
            const savedNotes = await getNotes();
            setNotes(savedNotes);
        };
        fetchNotes();
    }, []);

    // Funktion zum Umschalten der Auswahl einer Notiz
    const toggleSelectNote = (noteId) => {
        // Wenn die Notiz bereits ausgewählt ist, aus der Auswahl entfernen, ansonsten hinzufügen
        if (selectedNotes.includes(noteId)) {
            setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
        } else {
            setSelectedNotes([...selectedNotes, noteId]);
        }
    };

    // Funktion zum Löschen der ausgewählten Notizen
    const handleDeletedNotes = async () => {
        // Aktualisiere den Status der Notizen, indem die ausgewählten Notizen entfernt werden
        const updatedNotes = notes.filter((note) => !selectedNotes.includes(note.id));
        setNotes(updatedNotes);
        setSelectedNotes([]);

        // Lösche die ausgewählten Notizen aus dem Speicher
        for (const noteId of selectedNotes) {
            await deleteNote(noteId);
        }
    };

    // Navigation zur "Neue Notiz erstellen"-Seite
    const navigateToCreateNote = () => {
        router.push('/createNote');
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Alle Notizen</Text>
                {notes.length === 0 ? (
                    // Zeige eine Nachricht an, wenn keine Notizen vorhanden sind
                    <Text style={styles.noNotesText}>Keine Notizen vorhanden</Text>
                ) : (
                    // Zeige alle Notizen an, jede Notiz ist auswählbar
                    notes.map((note) => (
                        <TouchableOpacity key={note.id} onPress={() => toggleSelectNote(note.id)}>
                            <View style={[styles.noteCard, selectedNotes.includes(note.id) && styles.selectedNoteCard]}>
                                <Text style={styles.noteTitle}>{note.title}</Text>
                                <Text>{note.body}</Text>
                                {note.isImportant && <Text style={styles.importantLabel}>Wichtig!</Text>}
                            </View>
                        </TouchableOpacity>
                    ))
                )}
                {selectedNotes.length > 0 && (
                    // Zeige den Button zum Löschen der ausgewählten Notizen an, wenn mindestens eine ausgewählt ist
                    <Button title="Ausgewählte Notizen löschen" onPress={handleDeletedNotes} />
                )}
            </ScrollView>
            {/* Button zum Erstellen einer neuen Notiz, unten links fixiert */}
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/home/createNotePage')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
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
    selectedNoteCard: {
        backgroundColor: '#d3d3d3',
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
        left: 30, 
    },
    addButtonText: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 32,
    },
});

export default AllNotesPage;