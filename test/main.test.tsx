import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FileUploader, FileProvider, useFileList } from '../src';

interface TestAppProps {}

const TestApp: React.FC<TestAppProps> = () => {
  const files = useFileList();
  return (
    <div>
      <h2>Upload:</h2>
      <FileUploader multiple>
        <button>Pick files</button>
      </FileUploader>
      <div>
        {files.map(file => {
          return <img key={file.url} alt={file.name} src={file.url} />;
        })}
      </div>
    </div>
  );
};

function renderApp(props: TestAppProps) {
  return render(
    <FileProvider>
      <TestApp {...props} />
    </FileProvider>
  );
}

test('It renders without breaking', () => {
  renderApp({});
});

test('Things that should not be visible are not', () => {
  const { getByLabelText } = renderApp({});
  const input = getByLabelText(/pick/i);
  expect(input).not.toBeVisible();
});

test('File list works', () => {
  Object.defineProperty(window, 'URL', {
    value: {
      createObjectURL() {
        return 'blob:meow';
      },
      revokeObjectURL() {
        //
      },
    },
  });
  const { getByLabelText, getByAltText, container } = renderApp({});
  const input = getByLabelText(/pick/i);
  fireEvent.change(input, {
    target: {
      files: [new File([''], 'test.txt')],
    },
  });
  const img = getByAltText('test.txt') as HTMLImageElement;
  expect(img.src).toBe('blob:meow');
  fireEvent.change(input, {
    target: {
      files: null,
    },
  });
  expect(container.querySelector('img')).toBeNull();
});

afterEach(() => {
  delete window.URL;
});
