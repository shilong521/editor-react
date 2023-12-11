import { Message } from '@arco-design/web-react';
import { Transforms } from 'slate';
import { uploadImg } from '../navTools/tools/UploadImg';
import { uploadVideo } from '../navTools/tools/UploadVideo';
import { CustomElement, EditorType } from '../interface/withEditorProps';

//只处理img/video
const insertNodes = (
  type: 'image' | 'video',
  editor: EditorType,
  url: string
) => {
  const text = { text: '' };
  if (!type) return Message.error('类型错误');
  const element: CustomElement[] = [
    { type, url, children: [text] },
    {
      type: 'text',
      children: [{ text: '' }],
    },
  ];
  Transforms.insertNodes(editor, element);
};

//文件上传
const handleFileUpload = async (file: File, editor: EditorType) => {
  const type = file.type.split('/')[0];
  switch (type) {
    case 'image':
      return uploadImg(editor, file);
    case 'video':
      return uploadVideo(editor, file);
    default:
      return Message.error('文件格式错误');
  }
};

const withEditor = (editor: EditorType) => {
  const { insertData } = editor;
  editor.insertData = (data) => {
    const { files } = data;
    if (files?.length > 0) {
      for (const file of Array.from(files)) {
        const [mime] = file.type.split('/');
        switch (mime) {
          case 'image':
            return uploadImg(editor, file);
          case 'video':
            return uploadVideo(editor, file);
          default:
            return Message.error('格式错误');
        }
      }
    } else {
      insertData(data);
    }
  };
  return editor;
};

export { withEditor, insertNodes, handleFileUpload };
