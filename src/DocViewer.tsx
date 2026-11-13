import "core-js/proposals/promise-with-resolvers";
import React, { CSSProperties, forwardRef, memo } from "react";
import { HeaderBar } from "./components/HeaderBar";
import { ProxyRenderer } from "./components/ProxyRenderer";
import { AvailableLanguages } from "./i18n";
import {
  DocRenderer,
  DocViewerRef,
  IConfig,
  IDocument,
  ImageControlsState,
  ITheme,
  PdfControlsState,
} from "./models";
import { DocViewerRenderers } from "./renderers";
import { DocViewerProvider } from "./store/DocViewerProvider";
import { cn } from "./utils/cn";
import { resolveTheme, themeToCssVars } from "./utils/themeStyle";

export interface DocViewerProps {
  documents: IDocument[];
  className?: string;
  style?: CSSProperties;
  config?: IConfig;
  theme?: ITheme;
  pluginRenderers?: DocRenderer[];
  prefetchMethod?: string;
  requestHeaders?: Record<string, string>;
  initialActiveDocument?: IDocument;
  language?: AvailableLanguages;
  activeDocument?: IDocument;
  onDocumentChange?: (document: IDocument) => void;
  /** Dispara sempre que o estado dos controles do PDF muda. */
  onPdfStateChange?: (state: PdfControlsState | null) => void;
  /** Dispara sempre que o estado dos controles de imagem muda. */
  onImageStateChange?: (state: ImageControlsState | null) => void;
}

const DocViewer = forwardRef<DocViewerRef, DocViewerProps>((props, ref) => {
  const { documents, theme, className, style } = props;
  const resolvedTheme = resolveTheme(theme);

  if (!documents || !Array.isArray(documents)) {
    throw new Error("Please provide an array of documents to DocViewer!");
  }

  return (
    <DocViewerProvider
      ref={ref}
      pluginRenderers={DocViewerRenderers}
      {...props}
    >
      <div
        id="react-doc-viewer"
        data-testid="react-doc-viewer"
        data-scrollbar={resolvedTheme.disableThemeScrollbar ? "off" : "on"}
        className={cn("fv:flex fv:h-full fv:w-full fv:flex-col fv:bg-white", className)}
        style={{ ...themeToCssVars(resolvedTheme), ...style }}
      >
        <HeaderBar />
        <ProxyRenderer />
      </div>
    </DocViewerProvider>
  );
});

export default memo(DocViewer);
