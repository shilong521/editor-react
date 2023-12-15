import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LongEditor } from '../dist/es';
import { EditorValueProps } from '../dist/es/interface/longEditorProps';
import '../dist/es/css/style.css';

const App = () => {
  const [value, setValue] = useState<EditorValueProps[]>([]);
  return <LongEditor value={value} setValue={setValue} />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
