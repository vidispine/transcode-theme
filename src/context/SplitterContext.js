import React from 'react';

const SplitterContext = React.createContext({
  splitters: {},
});

const LOCALSTORAGE_KEY = 'LAYOUT_SPLITTERS';

const SplitterProvider = ({ splitters: initialSplitters, children }) => {
  const getCurrentSplitters = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || initialSplitters;
    } catch (e) {
      return initialSplitters;
    }
  };

  const [splitters, setSplitters] = React.useState(() => {
    return getCurrentSplitters();
  });

  React.useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(splitters));
  }, [splitters]);

  const resetSplitters = () => {
    setSplitters(initialSplitters);
  };

  const setSplitter = (name, size) => {
    setSplitters((prev) => ({ ...prev, [name]: size }));
  };

  return (
    <SplitterContext.Provider
      value={{
        splitters,
        resetSplitters,
        setSplitter,
      }}
    >
      {children}
    </SplitterContext.Provider>
  );
};

function useSplitters() {
  const context = React.useContext(SplitterContext);
  if (context === undefined) {
    throw new Error('useSplitters must be used within a SplitterContext');
  }
  return context;
}

export { useSplitters, SplitterProvider };
