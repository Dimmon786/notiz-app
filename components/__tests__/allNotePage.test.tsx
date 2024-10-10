import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AllNotesPage from '../allNotesPage';
import { getNotes, deleteNote } from '../storage/noteStorage';

// Mock der Speicherfunktionen
jest.mock('../storage/noteStorage', () => ({
  getNotes: jest.fn(),
  deleteNote: jest.fn(),
}));

describe('AllNotesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  it('should display a message when there are no notes', async () => {
    getNotes.mockResolvedValue([]);
    const { findByText } = render(<AllNotesPage />);
    expect(await findByText('Keine Notizen vorhanden')).toBeTruthy();
  });

  it('should delete selected notes', async () => {
    const notes = [
      { id: '1', title: 'Note 1', body: 'Body 1', isImportant: false },
    ];
    getNotes.mockResolvedValue(notes);

    const { findByText, getByText } = render(<AllNotesPage />);
    const note = await findByText('Note 1');

    // Simulate selecting a note and pressing delete
    fireEvent.press(note);
    fireEvent.press(getByText('Ausgewählte Notizen löschen'));

    await waitFor(() => {
      expect(deleteNote).toHaveBeenCalledWith('1');
    });
  });
});
