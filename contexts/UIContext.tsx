import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isAuthOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  isLibraryOpen: boolean;
  openLibrary: () => void;
  closeLibrary: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const openLibrary = () => setIsLibraryOpen(true);
  const closeLibrary = () => setIsLibraryOpen(false);

  return (
    <UIContext.Provider value={{ isAuthOpen, openAuth, closeAuth, isLibraryOpen, openLibrary, closeLibrary }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within a UIProvider');
  return context;
};