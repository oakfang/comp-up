import { useEffect, useMemo } from 'react';
import { useFileContext } from './FileContext';

interface FileWithObjectURL extends File {
  url: string;
}

export function useFileList() {
  const [files] = useFileContext();
  const urls = useMemo(() => files.map(file => URL.createObjectURL(file)), [
    files,
  ]);
  useEffect(() => () => urls.forEach(url => URL.revokeObjectURL(url)), [urls]);
  return files.map((file, index) => {
    return Object.defineProperty(file, 'url', {
      value: urls[index],
      enumerable: true,
    }) as FileWithObjectURL;
  });
}

export * from './BaseFileUploader';
export { FileProvider } from './FileContext';
export * from './FileUploader';
