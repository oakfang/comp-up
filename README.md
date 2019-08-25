# comp-up

The minimal, yet sane, way to handle files with ReactJS

## Why, though?

Handling files with React is not always great.
You have to go through the same "hide-the-input" routine, keep some state, sync the values, etc. Or you can opt for the huge chunky 3rd-party uploader that does everything for you, but you have to bend and shpe it for a while before it resembles what you actually want.

These utilities are simple abstractions with little to no design implications.

## How, though?

Well, a simple use-case would be something like this:

```jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { FileUploader, FileProvider, useFileList } from 'comp-up';

function UploadImagesPage() {
  return (
    <section>
      <h1>Upload image files here:</h1>
      <FileProvider>
        <UploadImages />
      </FileProvider>
    </section>
  );
}

function UploadImages() {
  const [files, clearFiles] = useFileList();
  useEffect(() => {
    if (files.length) {
      const data = new FormData();
      data.append('files', files);
      axios.post('/upload', data).then(() => {
        clearFiles();
      });
    }
  }, [files]);
  return (
    <FileUploader multiple accept="image/*">
      <div role="button">Pick files</button>
    </FileUploader>
  );
}
```

See further example in the `example` directory.

### Caveats

- You can't use a `<button>` inside of the `<FileUploader>`. This is due to some arcane event rules. Please, for the sake of a11y, make sure to add `role=button` to the "button-ish" you do add.
