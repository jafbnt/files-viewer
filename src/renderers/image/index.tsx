import React, { useContext } from "react";
import { DocRenderer, DocRendererProps } from "../../models";
import { cn } from "../../utils/cn";
import ImageControls from "./components/ImageControls";
import { ImageContext, ImageProvider } from "./state";

type ImageProxyProps = DocRendererProps & {
  children?: React.ReactNode;
  className?: string;
};

const ImageStage = ({
  currentDocument,
  children,
  className,
}: {
  currentDocument: NonNullable<DocRendererProps["mainState"]["currentDocument"]>;
  children?: React.ReactNode;
  className?: string;
}) => {
  const {
    state: { zoomLevel, rotation },
  } = useContext(ImageContext);

  return (
    <div
      id="image-renderer"
      className={cn(
        "fv:flex fv:h-full fv:w-full fv:flex-1 fv:items-center fv:justify-center fv:overflow-auto fv:bg-white",
        className,
      )}
    >
      <div
        id="image-stage"
        className="fv:flex fv:max-h-none fv:max-w-none fv:items-center fv:justify-center fv:transition-transform fv:duration-150"
        style={{
          transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
          transformOrigin: "center center",
        }}
      >
        {children || (
          <img
            id="image-img"
            className="fv:max-h-[95vh] fv:max-w-[95vw]"
            src={currentDocument.fileData as string}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

const ImageProxyRenderer = ({
  mainState,
  children,
  className,
}: ImageProxyProps) => {
  const { currentDocument } = mainState;
  if (!currentDocument) return null;

  return (
    <ImageProvider mainState={mainState}>
      <div className="fv:flex fv:h-full fv:w-full fv:flex-1 fv:flex-col">
        <ImageControls />
        <ImageStage
          currentDocument={currentDocument}
          className={className}
        >
          {children}
        </ImageStage>
      </div>
    </ImageProvider>
  );
};

const Renderer = ImageProxyRenderer as DocRenderer;
Renderer.fileTypes = [];
Renderer.weight = 0;

export default Renderer;
