import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from 'expo-router';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log('Ausgewähltes Datum:', day.dateString);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kalender</Text>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#007AFF' },
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
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  noteInfoText: {
    fontSize: 18,
  },
});

export default CalendarPage;