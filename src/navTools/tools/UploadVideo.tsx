import { useContext, useRef } from 'react';
import { CustomUpload, EditorConfig } from '../../LongEditor';
import { Icon, Message, Popover } from '@arco-design/web-react';
import { handleFileUpload, insertNodes } from '../../editor/WithEditor';
import { isEmpty } from 'lodash';
import { EditorType } from '../../interface/withEditorProps';

//上传视频文件
const uploadVideo = async (editor: EditorType, file: File) => {
  return new Promise(() => {
    const blob = new Blob([file], { type: file.type });
    const url = URL.createObjectURL(blob);
    if (!url) return Message.error('上传失败');
    insertNodes('video', editor, url);
  });
};

const VideoTool = () => {
  const fileImgRef = useRef<HTMLInputElement>(null);
  const { editor } = useContext(EditorConfig);
  const { customUploadVideo } = useContext(CustomUpload);
  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_4308055_ys99dpmbotm.js',
  });
  return (
    <Popover title="上传视频">
      <input
        multiple
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        ref={fileImgRef}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (isEmpty(customUploadVideo)) {
              handleFileUpload(file, editor);
            } else {
              const url = await customUploadVideo.cb(
                customUploadVideo.fieldName,
                file
              );
              const checkUrl = /^https?:\/\//i;
              if (url && checkUrl.test(url)) {
                insertNodes('video', editor, url);
              } else {
                Message.error('url格式错误');
              }
            }
          } else Message.error('文件格式错误');
        }}
      />
      <IconFont
        type="longEdit-icon-shipin"
        style={{ fontSize: 25, cursor: 'pointer' }}
        onClick={() => fileImgRef.current?.click()}
      />
    </Popover>
  );
};

export { VideoTool, uploadVideo };
