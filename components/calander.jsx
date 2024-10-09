import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const CalendarPage = () => {
    const [selectDate, setSelectedDate] = useState('');
    const navigation = usenavigation();

    const onDysPress = (day) => {
        setSelectedDate(date.dateString);
        console.log('ausgewähltes Datum:', day.dateString);        
    };

    return (
        <View style={StyleSheet.container}>
            <Text style={styles.header}>Kalender</Text>
        <Calendar
        onDayPress={onDayPress}
        markedDates={{
            [selectDate]: { selected: true, marked: true, selectedColor: '#007AFF'},
        }}
        theme={{
            todayTextColor: '#007AFF',
            arrowColor: '#007AFF',
        }}
        />
        {selectedDate ? (
            <View style={styles.noteInfoContainer}>
                <Text style={styles.noteInfoText}>Notizen für den {selectedDate} anzeigen...</Text>
            </View>
        ) : null}        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    noteInfoContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width:0, height: 1},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    noteInfoText: {
        fontSize: 18,
    },
});

export default CalendarPage;