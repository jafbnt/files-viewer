import { FC, ReactElement, ComponentType, PropsWithChildren } from "react";
import { IMainState } from "./store/mainStateReducer";
import { FileLoaderFunction } from "./utils/fileLoaders";

export interface IConfig {
  header?: IHeaderConfig;
  loadingRenderer?: ILoadingRendererConfig;
  noRenderer?: INoRendererConfig;
  csvDelimiter?: string;
  pdfZoom?: IPdfZoomConfig;
  /** Visibilidade dos botões da toolbar do PDF. */
  pdfControls?: IPdfControlsConfig;
  pdfVerticalScrollByDefault?: boolean;
  /**
   * URL do worker do PDF.js. Use um worker self-hosted quando o CSP
   * bloquear unpkg/CDN (ex.: copiar `pdfjs-dist/build/pdf.worker.min.mjs`).
   */
  pdfWorkerUrl?: string;
  /** Zoom padrão das imagens (PNG/JPG/GIF/WebP/BMP/TIFF). */
  imageZoom?: IImageZoomConfig;
  /** Visibilidade dos botões da toolbar de imagem. */
  imageControls?: IImageControlsConfig;
  /** Controles nativos do player de vídeo. */
  videoControls?: IVideoControlsConfig;
}

export interface ILoadingRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
  showLoadingTimeout?: false | number;
}

export interface INoRendererConfig {
  overrideComponent?: ComponentType<{
    document: IDocument | undefined;
    fileName: string;
  }>;
}

export interface IHeaderConfig {
  disableHeader?: boolean;
  disableFileName?: boolean;
  /** Esconde prev/next e contador de documentos no header. */
  disableDocumentNav?: boolean;
  retainURLParams?: boolean;
  overrideComponent?: IHeaderOverride;
}

export interface IPdfZoomConfig {
  defaultZoom: number;
  zoomJump: number;
}

/** `true` esconde o controle; omitido/`false` mantém visível. */
export interface IPdfControlsConfig {
  /** Esconde a toolbar inteira do PDF. */
  disable?: boolean;
  disableDownload?: boolean;
  disableZoomIn?: boolean;
  disableZoomOut?: boolean;
  disableZoomReset?: boolean;
  disablePagination?: boolean;
  disableTogglePagination?: boolean;
}

export interface IVideoControlsConfig {
  /** Remove o atributo `controls` do `<video>`. */
  disable?: boolean;
}

export interface IImageZoomConfig {
  defaultZoom?: number;
  zoomJump?: number;
}

/** `true` esconde o controle; omitido/`false` mantém visível. */
export interface IImageControlsConfig {
  /** Esconde a toolbar inteira de imagem. */
  disable?: boolean;
  disableDownload?: boolean;
  disableZoomIn?: boolean;
  disableZoomOut?: boolean;
  disableZoomReset?: boolean;
  disableRotateLeft?: boolean;
  disableRotateRight?: boolean;
  disableRotateReset?: boolean;
}

export interface ImageControlsState {
  zoomLevel: number;
  defaultZoomLevel: number;
  zoomJump: number;
  rotation: number;
  canZoomReset: boolean;
  canRotateReset: boolean;
  canDownload: boolean;
}

export interface ImageControlsApi {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
  setZoomLevel: (level: number) => void;
  rotateLeft: () => void;
  rotateRight: () => void;
  rotateReset: () => void;
  setRotation: (degrees: number) => void;
  download: () => void;
  getState: () => ImageControlsState;
}

export interface PdfControlsState {
  zoomLevel: number;
  defaultZoomLevel: number;
  zoomJump: number;
  currentPage: number;
  numPages: number;
  paginated: boolean;
  canZoomReset: boolean;
  canPrevPage: boolean;
  canNextPage: boolean;
  canTogglePagination: boolean;
  canDownload: boolean;
}

export interface PdfControlsApi {
  zoomIn: () => void;
  zoomOut: () => void;
  zoomReset: () => void;
  setZoomLevel: (level: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  togglePagination: () => void;
  setPaginated: (paginated: boolean) => void;
  download: () => void;
  getState: () => PdfControlsState;
}

export interface VideoControlsApi {
  play: () => Promise<void> | void;
  pause: () => void;
  togglePlay: () => Promise<void> | void;
  seek: (timeInSeconds: number) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  getState: () => {
    paused: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    muted: boolean;
  };
}

export type IHeaderOverride = (
  state: IMainState,
  previousDocument: () => void,
  nextDocument: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => ReactElement<any, any> | null;

export interface ITheme {
  primary?: string;
  secondary?: string;
  tertiary?: string;
  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  disableThemeScrollbar?: boolean;
}

/** @deprecated Mantido por compatibilidade de API; o tema agora usa CSS variables. */
export interface IStyledProps {
  theme: ITheme;
}

export interface IDocument {
  uri: string;
  fileType?: string;
  fileData?: string | ArrayBuffer;
  fileName?: string;
}

export interface DocRendererProps {
  mainState: IMainState;
}

export interface DocRenderer extends FC<PropsWithChildren<DocRendererProps>> {
  fileTypes: string[];
  weight: number;
  fileLoader?: FileLoaderFunction | null | undefined;
}

export interface DocViewerRef {
  /** Documento anterior na lista. */
  prev: () => void;
  /** Próximo documento na lista. */
  next: () => void;
  /**
   * Controles do PDF. `null` quando o documento ativo não é PDF
   * (ou o renderer ainda não montou).
   */
  pdf: PdfControlsApi | null;
  /**
   * Controles de imagem (PNG/JPG/GIF/WebP/BMP/TIFF).
   * `null` quando o documento ativo não é imagem.
   */
  image: ImageControlsApi | null;
  /**
   * Controles do vídeo. `null` quando o documento ativo não é vídeo
   * (ou o renderer ainda não montou).
   */
  video: VideoControlsApi | null;
}
