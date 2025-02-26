"use client"; // Required for Next.js

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { dracula } from "@uiw/codemirror-theme-dracula";

interface CodeEditorProps {
  language: "html" | "css" | "javascript";
  code: string;
  setCode: (value: string) => void;
  displayName: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, code, setCode, displayName }) => {
  const extensions = {
    html: html(),
    css: css(),
    javascript: javascript(),
  };

  return (<>
        <div className="editor-title">
        {displayName}
      </div>
      <CodeMirror
      className="code-mirror-root"
      value={code}
      theme={dracula} // Apply theme dynamically
      extensions={[extensions[language]]}
      onChange={(value) => setCode(value)}
      basicSetup={{ lineNumbers: true }}
    />
  </>

  );
};

export default CodeEditor;
