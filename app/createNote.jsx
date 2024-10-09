import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/native';

const CreateNotePage = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isImportant, setImportant] = useState(false);

    const handleSaveNote = () => {

        console.log('Notiz gespeichert:', { title, body, isImportant });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Neue Notiz erstellen</Text>

            <TextInput
                style={styles.input}
                placeholder='Title'
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder='Notizinhalt'
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

            <Button title="Speichern" onPress={handleSaveNote}/>
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
    texArea: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        fontSize: 18,
        heigth: 150,
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
        backgroundColor: 'd3d3d3',
    },
    toggleButtonActive: {
        backgroundColor: '#007AFF',
    },
    toggleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CreateNotePage;