import { RenderElementProps } from 'slate-react';
import { BigPlayButton, Player } from 'video-react';
import { Image } from '@arco-design/web-react';
import styles from '../styles/longEditor.module.less';
import 'video-react/dist/video-react.css';

export default function RenderElement(props: RenderElementProps) {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'image':
      return (
        <div contentEditable={false}>
          <Image width="100%" height={200} src={element.url} />
        </div>
      );
    case 'video':
      return (
        <div contentEditable={false} className={styles.player}>
          <Player fluid src={element.url}>
            <BigPlayButton position="center" />
          </Player>
        </div>
      );
    default:
      return (
        <div {...attributes} style={{ margin: '10px 0' }}>
          {children}
        </div>
      );
  }
}
