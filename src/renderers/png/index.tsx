import React from "react";
import { DocRenderer } from "../..";
import ImageProxyRenderer from "../image";

const PNGRenderer: DocRenderer = (props) => (
  <div className="fv-png-checkerboard fv:flex fv:h-full fv:w-full fv:flex-1">
    <ImageProxyRenderer {...props} />
  </div>
);

PNGRenderer.fileTypes = ["png", "image/png"];
PNGRenderer.weight = 0;

export default PNGRenderer;
