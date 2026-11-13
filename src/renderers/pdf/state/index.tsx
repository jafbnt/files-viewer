import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { PdfControlsApi, PdfControlsState } from "../../../models";
import { DocViewerContext } from "../../../store/DocViewerProvider";
import { IMainState } from "../../../store/mainStateReducer";
import {
  PDFActions,
  SET_CURRENT_MAIN_STATE,
  setCurrentPage,
  setPDFPaginated,
  setZoomLevel,
} from "./actions";
import { initialPDFState, IPDFState, reducer } from "./reducer";

const PDFContext = createContext<{
  state: IPDFState;
  dispatch: Dispatch<PDFActions>;
}>({ state: initialPDFState, dispatch: () => null });

const buildPdfState = (state: IPDFState): PdfControlsState => {
  const canDownload = Boolean(state.mainState?.currentDocument?.fileData);

  return {
    zoomLevel: state.zoomLevel,
    defaultZoomLevel: state.defaultZoomLevel,
    zoomJump: state.zoomJump,
    currentPage: state.currentPage,
    numPages: state.numPages,
    paginated: state.paginated,
    canZoomReset: state.zoomLevel !== state.defaultZoomLevel,
    canPrevPage: state.currentPage > 1,
    canNextPage: state.currentPage < state.numPages,
    canTogglePagination: state.numPages > 1,
    canDownload,
  };
};

const triggerDownload = (mainState?: IMainState) => {
  const document = mainState?.currentDocument;
  if (!document?.fileData || typeof document.fileData !== "string") return;

  const anchor = window.document.createElement("a");
  anchor.href = document.fileData;
  anchor.download = document.fileName || document.uri;
  anchor.rel = "noopener";
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

const PDFProvider: FC<PropsWithChildren<{ mainState: IMainState }>> = ({
  children,
  mainState,
}) => {
  const { registerPdfControls, onPdfStateChange } =
    useContext(DocViewerContext);
  const [state, dispatch] = useReducer(reducer, {
    ...initialPDFState,
    defaultZoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ??
      initialPDFState.defaultZoomLevel,
    zoomLevel:
      mainState.config?.pdfZoom?.defaultZoom ?? initialPDFState.zoomLevel,
    zoomJump: mainState.config?.pdfZoom?.zoomJump ?? initialPDFState.zoomJump,
    paginated: mainState.config?.pdfVerticalScrollByDefault
      ? false
      : initialPDFState.paginated,
    mainState,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const api = useMemo<PdfControlsApi>(
    () => ({
      zoomIn() {
        const current = stateRef.current;
        dispatch(setZoomLevel(current.zoomLevel + current.zoomJump));
      },
      zoomOut() {
        const current = stateRef.current;
        dispatch(setZoomLevel(current.zoomLevel - current.zoomJump));
      },
      zoomReset() {
        dispatch(setZoomLevel(stateRef.current.defaultZoomLevel));
      },
      setZoomLevel(level: number) {
        dispatch(setZoomLevel(level));
      },
      nextPage() {
        const current = stateRef.current;
        if (current.currentPage >= current.numPages) return;
        dispatch(setCurrentPage(current.currentPage + 1));
      },
      prevPage() {
        const current = stateRef.current;
        if (current.currentPage <= 1) return;
        dispatch(setCurrentPage(current.currentPage - 1));
      },
      setPage(page: number) {
        const current = stateRef.current;
        const nextPage = Math.min(Math.max(page, 1), current.numPages || 1);
        dispatch(setCurrentPage(nextPage));
      },
      togglePagination() {
        dispatch(setPDFPaginated(!stateRef.current.paginated));
      },
      setPaginated(paginated: boolean) {
        dispatch(setPDFPaginated(paginated));
      },
      download() {
        triggerDownload(stateRef.current.mainState);
      },
      getState() {
        return buildPdfState(stateRef.current);
      },
    }),
    [],
  );

  useEffect(() => {
    dispatch({
      type: SET_CURRENT_MAIN_STATE,
      value: mainState,
    });
  }, [mainState]);

  useEffect(() => {
    registerPdfControls(api);
    return () => registerPdfControls(null);
  }, [api, registerPdfControls]);

  useEffect(() => {
    onPdfStateChange?.(buildPdfState(state));
  }, [state, onPdfStateChange]);

  useEffect(() => {
    return () => onPdfStateChange?.(null);
  }, [onPdfStateChange]);

  return (
    <PDFContext.Provider value={{ state, dispatch }}>
      {children}
    </PDFContext.Provider>
  );
};

export { PDFContext, PDFProvider };
