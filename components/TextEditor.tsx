import React, { ChangeEvent, useState } from 'react'
import { BtnBold, BtnItalic, Editor, EditorProvider, Toolbar,BtnLink, BtnUnderline, BtnUndo, BtnRedo, BtnBulletList, BtnNumberedList, BtnStrikeThrough, BtnStyles } from "react-simple-wysiwyg"
import { Button } from './ui/button';
import { Brain } from 'lucide-react';

const TextEditor = ({ onTextEditorValueChange,defaultValue }:any) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div>
      <div className="flex justify-between my-2 items-center">
        <label className="text-sm pl-1">Summary</label>
        <Button
          className="flex gap-2 border-primary text-primary"
          variant={"outline"}
          size={"sm"}
        >
          <Brain className="h-4 w-4" />
          Generate from Ai
        </Button>
      </div>
      <EditorProvider>
        <Editor

          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onTextEditorValueChange(e);
          }}
          placeholder="Add your experience summery"
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnUndo />
            <BtnRedo />
            <BtnLink />
            <BtnStrikeThrough className="hidden md:flex" />
            <div className='hidden md:flex'>
            <BtnStyles/>
            </div>
            <BtnBulletList />
            <BtnNumberedList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default TextEditor