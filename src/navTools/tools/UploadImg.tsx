import { useContext, useRef } from 'react';
import { Icon, Message, Popover } from '@arco-design/web-react';
import { CustomUpload, EditorConfig } from '../../LongEditor';
import { handleFileUpload, insertNodes } from '../../editor/WithEditor';
import { EditorType } from '../../interface/withEditorProps';
import { isEmpty } from 'lodash';

//上传图片文件
const uploadImg = async (editor: EditorType, file: File) => {
  return new Promise(() => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      if (!result) return;
      const src = result.toString();
      const type = file.type.split('/')[0];
      if (type) {
        insertNodes('image', editor, src);
      } else Message.error('上传失败');
    };
  });
};

const ImageTool = () => {
  const fileImgRef = useRef<HTMLInputElement>(null);
  const { editor } = useContext(EditorConfig);
  const { customUploadImage } = useContext(CustomUpload);
  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_4308055_ys99dpmbotm.js',
  });
  return (
    <Popover title="上传照片">
      <input
        multiple
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileImgRef}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (isEmpty(customUploadImage)) {
              handleFileUpload(file, editor);
            } else {
              const url = await customUploadImage.cb(
                customUploadImage.fieldName,
                file
              );
              const checkUrl = /^https?:\/\//i;
              if (url && checkUrl.test(url)) {
                insertNodes('image', editor, url);
              } else {
                Message.error('url格式错误');
              }
            }
          } else Message.error('文件格式错误');
        }}
      />
      <IconFont
        type="longEdit-icon-tupian"
        style={{ fontSize: 25, cursor: 'pointer' }}
        onClick={() => fileImgRef.current?.click()}
      />
    </Popover>
  );
};

export { ImageTool, uploadImg };
