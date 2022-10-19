import React, { useEffect, useState } from "react";
import "./editor.css";

import CodeMirror from "@uiw/react-codemirror";
import * as themes from "@uiw/codemirror-themes-all";
import { html } from "@codemirror/lang-html";
import { htmlFormatter } from "../../common/utils";

interface Props {
  onInput(code: string): void;
  theme?: string;
}
// const editorOptions: BasicSetupOptions = {};
export default function Editor(props: Props) {
  const [created, setCreated] = useState(false);
  const [timeoutId, setTimeoutId] = useState({
    sendCode: 0,
    keyboardEvent: 0,
  });
  const [code, setCode] = useState(exampleCode);
  const [editorCode, setEditorCode] = useState(exampleCode);
  const [formattingActive, setformattingActive] = useState(false);
  const sendCode = (code: string) => {
    window.clearTimeout(timeoutId.sendCode);

    setCode(code);

    const newTimeoutId = window.setTimeout(() => {
      props.onInput(htmlFormatter(code));
    }, 1000);

    setTimeoutId((timeoutId) => ({
      ...timeoutId,
      sendCode: newTimeoutId,
    }));
  };
  const formatEditorCode = (ev: React.KeyboardEvent) => {
    if (formattingActive || code === editorCode) return;
    if (!(ev.shiftKey && ev.altKey && /f/i.test(ev.key))) return;

    setEditorCode(code);
    setTimeout(() => {
      setEditorCode(htmlFormatter(code));
    }, 400);
    setformattingActive(true);
    console.log("Formatting code...");
  };
  const releaseShortcuts = (ev: React.KeyboardEvent) => {
    const formatShortcutPressed = ev.shiftKey || ev.altKey || /f/i.test(ev.key);
    let releasedShortcut = false;
    if (formatShortcutPressed && formattingActive) {
      setformattingActive(false);
      console.log("Format shortcut released");
      releasedShortcut = true;
    }
    if (releasedShortcut) console.log("Released shortcuts");
  };
  const getTheme = (theme: string | undefined) => {
    if (!theme) return "dark";
    return theme === "dark" || theme === "light" ? theme : { ...themes }[theme];
  };
  useEffect(() => {
    if (created) return;
    props.onInput(exampleCode);
    setCreated(true);
  }, [props, created, setCreated]);

  return (
    <div className={`editorContainer ${props.theme}`}>
      <h2> Editor </h2>
      <CodeMirror
        extensions={[html()]}
        placeholder="Write your html code"
        value={editorCode}
        className="editor"
        height="100%"
        theme={getTheme(props.theme)}
        onChange={sendCode}
        onKeyDown={formatEditorCode}
        onKeyUp={releaseShortcuts}
      />
    </div>
  );
}

const exampleCode = `<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  @keyframes AnimationName {
    0%{
      background-position:0% 50%
    }
    50%{
      background-position:100% 50%
    }
    100%{background-position:0% 50%
    }
  }
  .container {
    font-family: 'Poppins', sans-serif;
    width: 100%;
    height: 94vh;
    text-align: center;
    font-size: 20px;
    color: white;
    background: linear-gradient(270deg, #27a081, #a07527, #a02727);
    background-size: 600% 600%;
    animation: AnimationName 2s ease infinite;
  }
  .container p {
    background: black;
  }
  p {
    color: green;
  }
</style>
<div class="container">
  <p>Hello World</p>
</div>
`;
