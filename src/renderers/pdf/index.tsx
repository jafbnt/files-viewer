import React from "react";
import { DocRenderer } from "../..";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
import { pdfjs } from "react-pdf";

const defaultPdfWorkerSrc = () =>
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFRenderer: DocRenderer = ({ mainState }) => {
  pdfjs.GlobalWorkerOptions.workerSrc =
    mainState.config?.pdfWorkerUrl || defaultPdfWorkerSrc();

  return (
    <PDFProvider mainState={mainState}>
      <div
        id="pdf-renderer"
        data-testid="pdf-renderer"
        className="fv:flex fv:flex-1 fv:flex-col"
      >
        <PDFControls />
        <PDFPages />
      </div>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;
