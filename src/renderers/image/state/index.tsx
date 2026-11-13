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
import { ImageControlsApi, ImageControlsState } from "../../../models";
import { DocViewerContext } from "../../../store/DocViewerProvider";
import { IMainState } from "../../../store/mainStateReducer";
import {
  ImageActions,
  resetImageView,
  setImageRotation,
  setImageZoomLevel,
} from "./actions";
import { IImageState, initialImageState, reducer } from "./reducer";

const ImageContext = createContext<{
  state: IImageState;
  dispatch: Dispatch<ImageActions>;
}>({ state: initialImageState, dispatch: () => null });

const buildImageState = (
  state: IImageState,
  mainState?: IMainState,
): ImageControlsState => {
  const fileData = mainState?.currentDocument?.fileData;
  const canDownload = typeof fileData === "string" && fileData.length > 0;

  return {
    zoomLevel: state.zoomLevel,
    defaultZoomLevel: state.defaultZoomLevel,
    zoomJump: state.zoomJump,
    rotation: state.rotation,
    canZoomReset: state.zoomLevel !== state.defaultZoomLevel,
    canRotateReset: state.rotation !== 0,
    canDownload,
  };
};

const triggerDownload = (mainState?: IMainState) => {
  const document = mainState?.currentDocument;
  if (!document || typeof document.fileData !== "string") return;

  const anchor = window.document.createElement("a");
  anchor.href = document.fileData;
  anchor.download = document.fileName || document.uri;
  anchor.rel = "noopener";
  window.document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

const ImageProvider: FC<PropsWithChildren<{ mainState: IMainState }>> = ({
  children,
  mainState,
}) => {
  const { registerImageControls, onImageStateChange } =
    useContext(DocViewerContext);

  const defaultZoom =
    mainState.config?.imageZoom?.defaultZoom ?? initialImageState.defaultZoomLevel;
  const zoomJump =
    mainState.config?.imageZoom?.zoomJump ?? initialImageState.zoomJump;

  const [state, dispatch] = useReducer(reducer, {
    ...initialImageState,
    defaultZoomLevel: defaultZoom,
    zoomLevel: defaultZoom,
    zoomJump,
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const mainStateRef = useRef(mainState);
  mainStateRef.current = mainState;

  const documentKey =
    mainState.currentDocument?.uri ?? mainState.currentDocument?.fileName ?? "";

  useEffect(() => {
    dispatch(resetImageView());
  }, [documentKey]);

  const api = useMemo<ImageControlsApi>(
    () => ({
      zoomIn() {
        const current = stateRef.current;
        dispatch(setImageZoomLevel(current.zoomLevel + current.zoomJump));
      },
      zoomOut() {
        const current = stateRef.current;
        dispatch(setImageZoomLevel(current.zoomLevel - current.zoomJump));
      },
      zoomReset() {
        dispatch(setImageZoomLevel(stateRef.current.defaultZoomLevel));
      },
      setZoomLevel(level: number) {
        dispatch(setImageZoomLevel(level));
      },
      rotateLeft() {
        dispatch(setImageRotation(stateRef.current.rotation - 90));
      },
      rotateRight() {
        dispatch(setImageRotation(stateRef.current.rotation + 90));
      },
      rotateReset() {
        dispatch(setImageRotation(0));
      },
      setRotation(degrees: number) {
        dispatch(setImageRotation(degrees));
      },
      download() {
        triggerDownload(mainStateRef.current);
      },
      getState() {
        return buildImageState(stateRef.current, mainStateRef.current);
      },
    }),
    [],
  );

  useEffect(() => {
    registerImageControls(api);
    return () => registerImageControls(null);
  }, [api, registerImageControls]);

  useEffect(() => {
    onImageStateChange?.(buildImageState(state, mainState));
  }, [state, mainState, onImageStateChange]);

  useEffect(() => {
    return () => onImageStateChange?.(null);
  }, [onImageStateChange]);

  return (
    <ImageContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };
