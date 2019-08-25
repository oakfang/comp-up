import * as React from 'react';

function useFilesState() {
  return React.useState<File[]>([]);
}

const FileContext = React.createContext<ReturnType<typeof useFilesState>>([
  [],
  () => null,
]);

export function useFileContext() {
  return React.useContext(FileContext);
}

export const FileProvider: React.FC = ({ children }) => {
  const ctx = useFilesState();
  return <FileContext.Provider value={ctx}>{children}</FileContext.Provider>;
};
