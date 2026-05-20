import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SavedItem, MilingoResult } from '../types';

interface LibraryContextType {
  library: SavedItem[];
  addItem: (result: MilingoResult, langId: string) => void;
  deleteItem: (id: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [library, setLibrary] = useState<SavedItem[]>([]);

  useEffect(() => {
    const savedLibrary = localStorage.getItem('milingo_library');
    if (savedLibrary) {
      try {
        setLibrary(JSON.parse(savedLibrary));
      } catch (e) {
        console.error("Failed to parse library", e);
      }
    }
  }, []);

  const addItem = (result: MilingoResult, langId: string) => {
    const newItem: SavedItem = {
      ...result,
      id: Date.now().toString(),
      languageId: langId,
      timestamp: Date.now()
    };
    
    const updatedLibrary = [newItem, ...library];
    setLibrary(updatedLibrary);
    localStorage.setItem('milingo_library', JSON.stringify(updatedLibrary));
  };

  const deleteItem = (id: string) => {
    const updatedLibrary = library.filter(item => item.id !== id);
    setLibrary(updatedLibrary);
    localStorage.setItem('milingo_library', JSON.stringify(updatedLibrary));
  };

  return (
    <LibraryContext.Provider value={{ library, addItem, deleteItem }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  return context;
};