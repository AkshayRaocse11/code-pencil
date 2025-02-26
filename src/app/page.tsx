"use client"; // Ensures client-side rendering in Next.js

import React, { useEffect, useState } from "react";
import "./global.css";
import CodeEditor from "./CodeEditor";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <div className="container">
        <div className="editor-container">
          <CodeEditor language="html" code={html} setCode={setHtml} displayName={"HTML"}/>
          <CodeEditor language="css" code={css} setCode={setCss} displayName={"CSS"}/>
          <CodeEditor language="javascript" code={js} setCode={setJs} displayName={"JS"}/>
        </div>

      </div>
      <h1>Preview</h1>
      <div className="preview">
       
      <iframe
        srcDoc={srcDoc}
        title="output"
        width="100%"
        height="100%"
      />

      </div>
    </>

  );
}
