import { EditorType } from '../interface/withEditorProps';
declare const insertNodes: (type: 'image' | 'video', editor: EditorType, url: string) => import("@arco-design/web-react/es/Message").MessageType | undefined;
declare const handleFileUpload: (file: File, editor: EditorType) => Promise<unknown>;
declare const withEditor: (editor: EditorType) => EditorType;
export { withEditor, insertNodes, handleFileUpload };
