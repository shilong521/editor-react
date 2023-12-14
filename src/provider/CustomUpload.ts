import { createContext } from 'react';
import { CustomUploadProps } from '../interface/longEditorProps';

const CustomUpload = createContext<CustomUploadProps>({});
export default CustomUpload;
