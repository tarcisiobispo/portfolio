import React from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import Header from './Header';
import BottomNavigation from './ui/BottomNavigation';

interface NavigationProviderProps {
  children: React.ReactNode;
}

const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      {children}
      <BottomNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
    </>
  );
};

export default NavigationProvider;
