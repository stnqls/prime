import React, { useState, useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import axios from "axios";

const ModifyEditor = (props: any) => {
  const editor: any = useRef();
  const [context, setContext] = useState();
  const [initialValue, setInitialValue] = useState();
  const imageArr: any = [];

  function changeText() {
    setContext(editor.current.getInstance().getHTML());
    if (props.data !== undefined) {
      setInitialValue(editor.current.getInstance().getHTML());
      props.getContent(editor.current.getInstance().getHTML());
    }
  }
  function setHTML() {
    editor.current.getInstance().setHTML(props.data);
  }

  useEffect(() => {
    uploadStorage();
  }, [editor]);

  useEffect(() => {
    setInitialValue(props.data);
    setHTML();
  }, [props.data]);

  function uploadStorage() {
    if (editor.current) {
      editor.current.getInstance().removeHook("addImageBlobHook"); //기존 이미지 업로드 기능 제거
      editor.current
        .getInstance()
        .addHook("addImageBlobHook", (file: any, callback: any) => {
          (async () => {
            const formData = new FormData();
            formData.append("board", file);

            const memberId: any = window.sessionStorage.getItem("uid");
            const res = await axios.post(
              "https://us-central1-prime-investment-web.cloudfunctions.net/api/storage/upload/board",
              formData,
              {
                headers: {
                  uid: memberId,
                },
              }
            );
            callback(res.data.data, "image");
            imageArr.push(res.data.data);
            props.getImage(imageArr);
          })();

          return false;
        });
    }
  }

  return (
    <Editor
      height="700px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      ref={editor}
      plugins={[colorSyntax, codeSyntaxHighlightPlugin]}
      onChange={changeText}
    />
  );
};

export default ModifyEditor;
