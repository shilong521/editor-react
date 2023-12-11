import { Space } from '@arco-design/web-react';
import initialToolsConfig from './InitialToolsConfig';

export default function NavTools() {
  return (
    <Space
      style={{
        width: '100%',
        borderBottom: '1px solid gray',
        padding: 5,
        boxSizing: 'border-box',
      }}
    >
      {initialToolsConfig.map((v, i) => (
        <v.element key={i} />
      ))}
    </Space>
  );
}
