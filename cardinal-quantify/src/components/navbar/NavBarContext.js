import { createContext, useState, useContext } from "react";

// Create Context
const SidebarContext = createContext();

// Custom Hook
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider Component
export const SidebarProvider = ({ children }) => {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ closeMenu, handleCloseMenu }}>
      {children}
    </SidebarContext.Provider>
  );
};
