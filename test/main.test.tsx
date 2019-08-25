import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FileUploader, FileProvider, useFileList } from '../src';

interface TestAppProps {}

const TestApp: React.FC<TestAppProps> = () => {
  const [files, reset] = useFileList();
  return (
    <div>
      <h2>Upload:</h2>
      <FileUploader multiple>
        <button>Pick files</button>
      </FileUploader>
      {files.length && <button onClick={reset}>Clear files</button>}
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

beforeEach(() => {
  Reflect.set(window, 'URL', {
    createObjectURL() {
      return 'blob:meow';
    },
    revokeObjectURL() {
      //
    },
  });
});
afterEach(() => {
  delete window.URL;
});

test('It renders without breaking', () => {
  renderApp({});
});

test('Things that should not be visible are not', () => {
  const { getByLabelText } = renderApp({});
  const input = getByLabelText(/pick/i);
  expect(input).not.toBeVisible();
});

test('File list works', () => {
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

test('Clear files', () => {
  const { getByLabelText, queryByAltText, getByText } = renderApp({});
  const input = getByLabelText(/pick/i);
  fireEvent.change(input, {
    target: {
      files: [new File([''], 'test.txt')],
    },
  });
  expect(queryByAltText('test.txt')).not.toBeNull();
  const clear = getByText(/clear/i);
  fireEvent.click(clear, {});
  expect(queryByAltText('test.txt')).toBeNull();
});
