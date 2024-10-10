import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const HomePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notiz App</Text>

            <View style={styles.cardContainer}>
                <Link href="/recentNotes" style={styles.card}>
                    <Text style={styles.cardText}>Letzte Notizen</Text>
                </Link>

                <Link href="/allNotes" style={styles.card}>
                    <Text style={styles.cardText}>Alle Notizen</Text>
                </Link>

                <Link href="/calendar" style={styles.card}>
                    <Text style={styles.cardText}>Kalender</Text>
                </Link>
            </View>

            <Link href="/createNote" style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </Link>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardContainer: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#ffffff',
        width: '45%',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, 
    },
    cardText: {
        fontSize: 18,
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
        lineHeight: 32,
    },
});

export default HomePage;