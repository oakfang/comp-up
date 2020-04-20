import { useEffect, useMemo, useCallback } from 'react';
import { useFileContext } from './FileContext';

interface FileWithObjectURL extends File {
  url: string;
}

export function useFileList(): [FileWithObjectURL[], () => void] {
  const [files, setFiles] = useFileContext();
  const urls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [
    files,
  ]);
  useEffect(() => () => urls.forEach((url) => URL.revokeObjectURL(url)), [
    urls,
  ]);
  const clearFiles = useCallback(() => setFiles([]), [setFiles]);
  const fileList = useMemo(
    () =>
      (files as FileWithObjectURL[]).map((file, index) => {
        const url = urls[index];
        if (file.url) {
          return file;
        }
        return Object.defineProperty(file, 'url', {
          value: url,
          enumerable: true,
        }) as FileWithObjectURL;
      }),
    [files, urls]
  );
  return [fileList, clearFiles];
}

export * from './BaseFileUploader';
export { FileProvider } from './FileContext';
export * from './FileUploader';
