import React, {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  PropsWithChildren,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { DocViewerProps } from "../DocViewer";
import {
  DocViewerRef,
  ImageControlsApi,
  ImageControlsState,
  PdfControlsApi,
  PdfControlsState,
  VideoControlsApi,
} from "../models";
import { defaultLanguage, locales } from "../i18n";
import {
  MainStateActions,
  nextDocument,
  previousDocument,
  setAllDocuments,
  setMainConfig,
  updateCurrentDocument,
} from "./actions";
import { IMainState, initialState, mainStateReducer } from "./mainStateReducer";

type DocViewerContextValue = {
  state: IMainState;
  dispatch: Dispatch<MainStateActions>;
  registerPdfControls: (api: PdfControlsApi | null) => void;
  registerImageControls: (api: ImageControlsApi | null) => void;
  registerVideoControls: (api: VideoControlsApi | null) => void;
  onPdfStateChange?: (state: PdfControlsState | null) => void;
  onImageStateChange?: (state: ImageControlsState | null) => void;
};

const DocViewerContext = createContext<DocViewerContextValue>({
  state: initialState,
  dispatch: () => null,
  registerPdfControls: () => undefined,
  registerImageControls: () => undefined,
  registerVideoControls: () => undefined,
});

const DocViewerProvider = forwardRef<
  DocViewerRef,
  PropsWithChildren<DocViewerProps>
>((props, ref) => {
  const {
    children,
    documents,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    initialActiveDocument,
    language,
    activeDocument,
    onDocumentChange,
    onPdfStateChange,
    onImageStateChange,
  } = props;

  const [state, dispatch] = useReducer(mainStateReducer, {
    ...initialState,
    documents: documents || [],
    currentDocument:
      documents && documents.length
        ? initialActiveDocument
          ? initialActiveDocument
          : documents[0]
        : undefined,
    config,
    pluginRenderers,
    prefetchMethod,
    requestHeaders,
    currentFileNo: initialActiveDocument
      ? Math.max(
          0,
          (documents || []).findIndex((doc) => doc === initialActiveDocument),
        )
      : 0,
    language: language && locales[language] ? language : defaultLanguage,
    activeDocument,
    onDocumentChange,
  });

  const pdfControlsRef = useRef<PdfControlsApi | null>(null);
  const imageControlsRef = useRef<ImageControlsApi | null>(null);
  const videoControlsRef = useRef<VideoControlsApi | null>(null);

  const registerPdfControls = useCallback((api: PdfControlsApi | null) => {
    pdfControlsRef.current = api;
  }, []);

  const registerImageControls = useCallback((api: ImageControlsApi | null) => {
    imageControlsRef.current = api;
  }, []);

  const registerVideoControls = useCallback((api: VideoControlsApi | null) => {
    videoControlsRef.current = api;
  }, []);

  useEffect(() => {
    dispatch(setAllDocuments(documents, initialActiveDocument));
    config && dispatch(setMainConfig(config));
  }, [documents, config, initialActiveDocument]);

  useEffect(() => {
    if (activeDocument) {
      dispatch(updateCurrentDocument(activeDocument));
    }
  }, [activeDocument]);

  useImperativeHandle(
    ref,
    () => ({
      prev() {
        dispatch(previousDocument());
      },
      next() {
        dispatch(nextDocument());
      },
      get pdf() {
        return pdfControlsRef.current;
      },
      get image() {
        return imageControlsRef.current;
      },
      get video() {
        return videoControlsRef.current;
      },
    }),
    [dispatch],
  );

  return (
    <DocViewerContext.Provider
      value={{
        state,
        dispatch,
        registerPdfControls,
        registerImageControls,
        registerVideoControls,
        onPdfStateChange,
        onImageStateChange,
      }}
    >
      {children}
    </DocViewerContext.Provider>
  );
});

export { DocViewerContext, DocViewerProvider };
