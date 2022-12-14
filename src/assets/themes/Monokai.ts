import { editor } from "monaco-editor";
const Monokai: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", background: "#272822" },
    { token: "comment", foreground: "#75715e" },
    { token: "tag", foreground: "#f92672" },
    { token: "delimiter.html", foreground: "#ffffff" },
    { token: "attribute.name.html", foreground: "#a6e22e" },
    { token: "attribute.value.html", foreground: "#e6db74" },
    { token: "attribute.name.css", foreground: "#66d9ef" },
    { token: "attribute.value.css", foreground: "#ae81ff" },
    { token: "attribute.value.number.css", foreground: "#ae81ff" },
    { token: "attribute.value.unit.css", foreground: "#f92672" },
    { token: "keyword", foreground: "#f92672" },
    { token: "string", foreground: "#e6db74" },
  ],
  colors: {
    "editor.foreground": "#F8F8F2",
    "editor.background": "#272822",
    "editor.selectionBackground": "#49483E",
    "editor.lineHighlightBackground": "#3E3D32",
    "editorCursor.foreground": "#F8F8F0",
    "editorWhitespace.foreground": "#3B3A32",
    "editorIndentGuide.activeBackground": "#9D550FB0",
    "editor.selectionHighlightBorder": "#222218",
  },
};

export default Monokai;
