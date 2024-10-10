import { saveNote, getNotes, deleteNote } from '../storage/noteStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Note Storage Functions', () => {
  const note = {
    id: '123',
    title: 'Test Note',
    body: 'This is a test note',
    isImportant: false,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls between tests
  });

  it('should save a new note', async () => {
    await saveNote(note);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify([note]));
  });

  it('should return all saved notes', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([note]));
    const notes = await getNotes();
    expect(notes).toEqual([note]);
  });

  it('should delete a note', async () => {
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify([note]));
    await deleteNote(note.id);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('notes', JSON.stringify([]));
  });
});