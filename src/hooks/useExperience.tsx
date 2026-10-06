'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ExperienceContextType {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
  entered: boolean;
  setEntered: (v: boolean) => void;
  activeSection: number;
  setActiveSection: (v: number) => void;
  webglAvailable: boolean;
  setWebglAvailable: (v: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextType>({
  loaded: false,
  setLoaded: () => {},
  entered: false,
  setEntered: () => {},
  activeSection: 0,
  setActiveSection: () => {},
  webglAvailable: true,
  setWebglAvailable: () => {},
});

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [webglAvailable, setWebglAvailable] = useState(true);

  return (
    <ExperienceContext.Provider
      value={{
        loaded, setLoaded,
        entered, setEntered,
        activeSection, setActiveSection,
        webglAvailable, setWebglAvailable,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  return useContext(ExperienceContext);
}
