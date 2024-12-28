import React, { ChangeEvent, useEffect, useState } from 'react'
import { BtnBold, BtnItalic, Editor, EditorProvider, Toolbar,BtnLink, BtnUnderline, BtnUndo, BtnRedo, BtnBulletList, BtnNumberedList, BtnStrikeThrough, BtnStyles } from "react-simple-wysiwyg"
import { Button } from './ui/button';
import { Brain } from 'lucide-react';

const TextEditor = ({ onTextEditorValueChange,defaultValue }:any) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(()=>{
    setValue(defaultValue)
  },[defaultValue])
  return (
    <div>
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