import React, { useEffect, useState } from "react";
import { DocRenderer } from "../..";
import { useTranslation } from "../../hooks/useTranslation";
import { arrayBufferFileLoader } from "../../utils/fileLoaders";
import ImageProxyRenderer from "../image";
import { parseTIFF } from "./tiffToCanvas";

const TIFFRenderer: DocRenderer = (props) => {
  const {
    mainState: { currentDocument },
  } = props;
  const { t } = useTranslation();

  const [loadedCanvas, setLoadedCanvas] = useState(false);
  const [corruptedFile, setCorruptedFile] = useState(false);

  useEffect(() => {
    setLoadedCanvas(false);
    setCorruptedFile(false);
  }, [currentDocument?.uri, currentDocument?.fileData]);

  useEffect(() => {
    if (!currentDocument || loadedCanvas) return;
    const canvas = document.getElementById("tiff-img");

    try {
      canvas && parseTIFF(currentDocument.fileData as ArrayBuffer, canvas);
      setLoadedCanvas(true);
    } catch {
      setCorruptedFile(true);
    }
  }, [currentDocument, loadedCanvas]);

  if (corruptedFile) {
    return (
      <ImageProxyRenderer {...props}>
        <div>{t("brokenFile")}</div>
      </ImageProxyRenderer>
    );
  }

  return (
    <ImageProxyRenderer {...props}>
      <canvas id="tiff-img" className="fv:max-h-[95%] fv:max-w-[95%]" />
    </ImageProxyRenderer>
  );
};
TIFFRenderer.fileTypes = ["tif", "tiff", "image/tif", "image/tiff"];
TIFFRenderer.weight = 0;
TIFFRenderer.fileLoader = arrayBufferFileLoader;

export default TIFFRenderer;
