import React from 'react';
type FileUrl = string;
interface CustomUploadCb {
    /**
     * @fieldName 自定义上传文件名
     */
    fieldName: string;
    /**
     * @cb 自定义上传逻辑，返回值是文件的url
     * @fieldName 自定义上传文件名
     * @file 当前文件的file
     */
    cb: (fieldName: string, file: File) => Promise<FileUrl>;
}
export interface CustomUploadProps {
    /**
     * @customUploadImage 自定义图片上传逻辑
     */
    customUploadImage?: CustomUploadCb;
    /**
     * @customUploadVideo 自定义视频上传逻辑，注意数据格式
     */
    customUploadVideo?: CustomUploadCb;
}
/**
 * @editorValue 编辑器值，注意数据格式
 */
export interface EditorValueProps {
    type: 'text' | 'image' | 'video';
    /**
     * @value 'image' | 'video'类型传空字符串即可''
     */
    value: string;
    /**
     * @value 'image' | 'video'类型传对应文件url
     */
    url?: string;
}
/**
  longEditor编辑器，支持复制粘贴照片，视频在编辑器展示
*/
export interface LongEditorProps extends CustomUploadProps {
    /**
     * @value 编辑器的值
     */
    value: EditorValueProps[];
    style?: React.CSSProperties;
    /**
     * @loading 编辑器是否加载中
     */
    loading?: boolean;
    /**
     * @setValue 异步更新value
     */
    setValue: (value: EditorValueProps[]) => void;
}
export {};
