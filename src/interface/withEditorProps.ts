import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type CustomElement = {
  type: 'text' | 'image' | 'video';
  url?: string;
  children: CustomText[];
};
type CustomText = { text: string; bold?: true };

export type EditorType = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}
