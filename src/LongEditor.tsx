import './styles/global.less';
import { useMemo } from 'react';
import { Descendant, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import NavTools from './navTools/NavTools';
import RenderElement from './renderElement/RenderElement';
import { EditorValueProps, LongEditorProps } from './interface/longEditorProps';
import { omitBy } from 'lodash';
import { Spin } from '@arco-design/web-react';
import { withEditor } from './editor/WithEditor';
import EditorConfig from './provider/EditorConfig';
import CustomUpload from './provider/CustomUpload';

function LongEditor(props: LongEditorProps) {
  const {
    value,
    style,
    loading = false,
    customUploadImage,
    customUploadVideo,
    setValue,
  } = props;

  const editor = useMemo(
    () => withEditor(withHistory(withReact(createEditor()))),
    []
  );

  const editorValueFnc = (value: EditorValueProps[]): Descendant[] => {
    if (value && value.length)
      return value.reduce<Descendant[]>((arr, item) => {
        arr.push({ ...item, children: [{ text: item.value }] });
        return arr;
      }, []);
    return [
      {
        type: 'text',
        children: [{ text: '' }],
      },
    ];
  };

  return (
    <Spin loading={loading}>
      <div
        style={
          style || {
            width: 500,
            border: '1px solid gray',
          }
        }
      >
        <Slate
          editor={editor}
          initialValue={editorValueFnc(value)}
          onChange={(value: any[]) => {
            setValue(
              value.map<EditorValueProps>(
                (v) =>
                  omitBy(
                    {
                      type: v.type,
                      url: v.url,
                      value: v.children?.[0].text || '',
                    },
                    (value, key) => key !== 'text' && !value
                  ) as EditorValueProps
              )
            );
          }}
        >
          <EditorConfig.Provider value={{ editor }}>
            <CustomUpload.Provider
              value={{ customUploadImage, customUploadVideo }}
            >
              <NavTools />
              <Editable
                style={{
                  minHeight: 200,
                  padding: 5,
                  overflow: 'scroll',
                }}
                renderElement={RenderElement}
              />
            </CustomUpload.Provider>
          </EditorConfig.Provider>
        </Slate>
      </div>
    </Spin>
  );
}

export { LongEditor };
