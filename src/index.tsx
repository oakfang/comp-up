import { useEffect, useMemo, useCallback } from 'react';
import { useFileContext } from './FileContext';

interface FileWithObjectURL extends File {
  url: string;
}

export function useFileList(): [FileWithObjectURL[], () => void] {
  const [files, setFiles] = useFileContext();
  const urls = useMemo(() => files.map(file => URL.createObjectURL(file)), [
    files,
  ]);
  useEffect(() => () => urls.forEach(url => URL.revokeObjectURL(url)), [urls]);
  const clearFiles = useCallback(() => setFiles([]), [setFiles]);
  const fileList = files.map((file, index) => {
    return Object.defineProperty(file, 'url', {
      value: urls[index],
      enumerable: true,
    }) as FileWithObjectURL;
  });
  return [fileList, clearFiles];
}

export * from './BaseFileUploader';
export { FileProvider } from './FileContext';
export * from './FileUploader';
