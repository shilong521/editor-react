import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LongEditor } from '../node_modules/@longreact/editor';
import { EditorValueProps } from '../node_modules/@longreact/editor/dist/interface/longEditorProps';
import '../node_modules/@longreact/editor/dist/css/style.css';

const App = () => {
  const [value, setValue] = useState<EditorValueProps[]>([]);
  return <LongEditor value={value} setValue={setValue} />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
