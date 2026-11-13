import React from "react";
import { DocRenderer } from "../..";
import { textFileLoader } from "../../utils/fileLoaders";

const TXTRenderer: DocRenderer = ({ mainState: { currentDocument } }) => {
  const text =
    typeof currentDocument?.fileData === "string"
      ? currentDocument.fileData
      : "";

  return (
    <pre
      id="txt-renderer"
      className="fv:m-0 fv:flex fv:w-full fv:flex-col fv:p-[30px] fv:font-[inherit] fv:break-words fv:whitespace-pre-wrap"
    >
      {text}
    </pre>
  );
};

export default TXTRenderer;

TXTRenderer.fileTypes = ["txt", "text/plain"];
TXTRenderer.weight = 0;
TXTRenderer.fileLoader = textFileLoader;
