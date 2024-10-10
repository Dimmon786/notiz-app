import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CreateNotePage from '../createNotePage';
import { saveNote } from '../storage/noteStorage';
import { useRouter } from 'expo-router';

// Mock die saveNote Funktion
jest.mock('../storage/noteStorage', () => ({
  saveNote: jest.fn(),
}));

// Mock den useRouter Hook
jest.mock('expo-router', () => ({
  useRouter: () => ({
    back: jest.fn(), // Mock der back-Funktion
  }),
}));

describe('CreateNotePage', () => {
  it('sollte korrekt gerendert werden', () => {
    const { getByPlaceholderText, getByText } = render(<CreateNotePage />);
    
    // Überprüfen, ob die Eingabefelder und der Button vorhanden sind
    expect(getByPlaceholderText('Titel')).toBeTruthy();
    expect(getByPlaceholderText('Notizinhalt')).toBeTruthy();
    expect(getByText('Speichern')).toBeTruthy();
  });

  it('sollte eine Notiz speichern, wenn der Speichern-Button gedrückt wird', () => {
    const { getByPlaceholderText, getByText } = render(<CreateNotePage />);

    // Formularfelder ausfüllen
    fireEvent.changeText(getByPlaceholderText('Titel'), 'Neue Notiz');
    fireEvent.changeText(getByPlaceholderText('Notizinhalt'), 'Das ist eine neue Notiz');

    // Speichern-Button drücken
    fireEvent.press(getByText('Speichern'));

    // Überprüfen, ob die Funktion saveNote mit den richtigen Argumenten aufgerufen wurde
    expect(saveNote).toHaveBeenCalledWith({
      id: expect.any(String),
      title: 'Neue Notiz',
      body: 'Das ist eine neue Notiz',
      isImportant: false,
    });
  });
});
