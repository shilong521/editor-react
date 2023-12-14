import { createContext } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { EditorType } from '../interface/withEditorProps';
import { withEditor } from '../editor/WithEditor';

const EditorConfig = createContext<{ editor: EditorType }>({
  editor: withEditor(withHistory(withReact(createEditor()))),
});

export default EditorConfig;
