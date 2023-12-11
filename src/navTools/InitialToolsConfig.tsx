import { InitialToolsConfig } from '../interface/ToolProps';
import EmojsTool from './tools/Emojs';
import { ImageTool } from './tools/UploadImg';
import { VideoTool } from './tools/UploadVideo';

const initialToolsConfig: InitialToolsConfig[] = [
  { element: ImageTool },
  { element: VideoTool },
  { element: EmojsTool },
];

export default initialToolsConfig;
