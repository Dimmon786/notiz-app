import AsyncStorage from '@react-native-async-storage/async-storage';

// Funktionen zum Speichern einer neuen Notiz
export const saveNote = async (note) => {
    try {
        // Vorhandene Notizen abrufen
        const existingNotes = await AsyncStorage.getItem('notes');
        const notes = existingNotes ? JSON.parse(existingNotes) : [];

        // Neue Notiz zur Liste hinzufügen
        notes.push(note);

        // Notizen speichern
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        console.log('Notiz erfolgreich gespeichert');
    } catch (error) {
        console.error('Fehler beim Speichern der Notiz', error);
    }
};

// Funktion zum Abrufen aller Notizen
export const getNotes = async () => {
  try {
    const existingNotes = await AsyncStorage.getItem('notes');
    return existingNotes ? JSON.parse(existingNotes) : [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Notizen:', error);
    return [];
  }
};

// Funktion zum Löschen einer Notiz
export const deleteNote = async (noteId) => {
    try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = existingNotes ? JSON.parse(existingNotes) : [];

        // Notiz mit der passenden ID entfernen
        notes = notes.filter(note => note.id !== noteId);

        // Notizen aktualisiert speichern
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        console.log('Notiz erfolgreich gelöscht');
    } catch (error) {
        console.error('Fehler beim Löschen der Notiz:', error);
    }
};

// Funktion zum Aktualisieren einer Notiz
export const updateNote = async (updateNote) => {
    try {
        const existingNotes = await AsyncStorage.getItem('notes');
        let notes = existingNotes ? JSON.parse(existingNotes) : [];

        // Notiz mit der passenden ID aktualisieren
        notes = notes.map(note => note.id === updateNote.id ? updateNote : note);

        // Notizen aktualisiert speichern
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        console.log('Notiz erfolgreich aktualisiert');        
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Notiz:', error);
    }
};