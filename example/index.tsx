import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FileUploader, FileProvider, useFileList } from '../src';

const appearance = type => ({
  appearance: type,
  WebkitAppearance: type,
  MozAppearance: type,
});

const App = () => {
  const [files] = useFileList();
  return (
    <div>
      <h2>Upload:</h2>
      <FileUploader multiple accept="image/*">
        <span style={{ ...appearance('button'), padding: 6 }}>Pick files</span>
      </FileUploader>
      <div>
        {files.map(file => {
          return <img key={file.url} alt={file.name} src={file.url} />;
        })}
      </div>
    </div>
  );
};

ReactDOM.render(
  <FileProvider>
    <App />
  </FileProvider>,
  document.getElementById('root')
);
