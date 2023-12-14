import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LongEditor } from '../node_modules/@shilong521/editor-react/dist/es';
import { EditorValueProps } from '../node_modules/@shilong521/editor-react/dist/es/interface/longEditorProps';
import '../node_modules/@shilong521/editor-react/dist/es/css/style.css';

const App = () => {
  const [value, setValue] = useState<EditorValueProps[]>([]);
  return <LongEditor value={value} setValue={setValue} />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
