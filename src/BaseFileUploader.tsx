import * as React from 'react';

function useUniqueId() {
  return React.useMemo(() => {
    return Math.random().toString();
  }, []);
}

export interface BaseFileUploaderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'type' | 'className' | 'value'
  > {
  className?: string;
}

export const BaseFileUploader: React.FunctionComponent<BaseFileUploaderProps> = ({
  children,
  className,
  ...fileProps
}) => {
  const id = useUniqueId();
  return (
    <div className={className}>
      <input {...fileProps} hidden value="" type="file" id={id} />
      <label htmlFor={id}>{React.Children.only(children)}</label>
    </div>
  );
};
