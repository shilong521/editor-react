import { Button, Icon, Popover } from '@arco-design/web-react';
import { Transforms } from 'slate';
import { emojiMap } from '../../consts/emojs';
import { useContext } from 'react';
import { EditorConfig } from '../../LongEditor';

export default function EmojsTool() {
  const { editor } = useContext(EditorConfig);
  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/c/font_4308055_ys99dpmbotm.js',
  });
  return (
    <Popover
      trigger="focus"
      title="emojs表情"
      content={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'scroll',
            height: 300,
          }}
        >
          {Object.keys(emojiMap).map((v) => (
            <Button
              key={v}
              type="text"
              onClick={() => Transforms.insertText(editor, v)}
            >
              {v}
            </Button>
          ))}
        </div>
      }
    >
      <IconFont
        type="longEdit-icon-rich"
        style={{ fontSize: 25, cursor: 'pointer' }}
      />
    </Popover>
  );
}
