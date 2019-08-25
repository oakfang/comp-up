import * as React from 'react';
import { useFileContext } from './FileContext';
import { BaseFileUploader, BaseFileUploaderProps } from './BaseFileUploader';

type FileUploaderProps = Omit<BaseFileUploaderProps, 'onChange'>;

export const FileUploader: React.FunctionComponent<
  FileUploaderProps
> = props => {
  const [, setFiles] = useFileContext();
  return (
    <BaseFileUploader
      {...props}
      onChange={event => {
        const { files } = event.target;
        setFiles(files ? Array.from(files) : []);
      }}
    />
  );
};
