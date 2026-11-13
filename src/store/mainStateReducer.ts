import { DocRenderer, IConfig, IDocument } from "..";
import {
  MainStateActions,
  NEXT_DOCUMENT,
  PREVIOUS_DOCUMENT,
  SetAllDocuments,
  SetDocumentLoading,
  SetMainConfig,
  SetRendererRect,
  SET_ALL_DOCUMENTS,
  SET_DOCUMENT_LOADING,
  SET_MAIN_CONFIG,
  SET_RENDERER_RECT,
  UpdateCurrentDocument,
  UPDATE_CURRENT_DOCUMENT,
} from "./actions";
import { AvailableLanguages, defaultLanguage } from "../i18n";

export type IMainState = {
  currentFileNo: number;
  documents: IDocument[];
  documentLoading?: boolean;
  currentDocument?: IDocument;
  rendererRect?: DOMRect;
  config?: IConfig;
  pluginRenderers?: DocRenderer[];
  prefetchMethod?: string;
  requestHeaders?: Record<string, string>;
  language: AvailableLanguages;
  activeDocument?: IDocument;
  onDocumentChange?: (document: IDocument) => void;
};

export const initialState: IMainState = {
  currentFileNo: 0,
  documents: [],
  documentLoading: true,
  currentDocument: undefined,
  rendererRect: undefined,
  config: {},
  pluginRenderers: [],
  language: defaultLanguage,
};

export type MainStateReducer = (
  state: IMainState,
  action: MainStateActions,
) => IMainState;

export const mainStateReducer: MainStateReducer = (
  state = initialState,
  action: MainStateActions,
): IMainState => {
  switch (action.type) {
    case SET_ALL_DOCUMENTS: {
      const { documents, initialActiveDocument } = action as SetAllDocuments;
      const nextDocuments = Array.isArray(documents) ? documents : [];
      const nextCurrentDocument = initialActiveDocument
        ? initialActiveDocument
        : nextDocuments[0] || undefined;
      const nextFileNo =
        initialActiveDocument && nextDocuments.includes(initialActiveDocument)
          ? nextDocuments.indexOf(initialActiveDocument)
          : 0;
      const documentChanged =
        nextCurrentDocument?.uri !== state.currentDocument?.uri;

      return {
        ...state,
        documents: nextDocuments,
        currentDocument: nextCurrentDocument,
        currentFileNo: nextFileNo,
        // Reload only when the active document URI changes (e.g. new upload)
        documentLoading: documentChanged
          ? Boolean(nextCurrentDocument)
          : state.documentLoading,
      };
    }

    case SET_DOCUMENT_LOADING: {
      const { value } = action as SetDocumentLoading;

      return { ...state, documentLoading: value };
    }

    case NEXT_DOCUMENT: {
      if (state.currentFileNo >= state.documents.length - 1) return state;
      const nextDocumentNo = state.currentFileNo + 1;

      if (state.onDocumentChange) {
        state.onDocumentChange(state.documents[nextDocumentNo]);
      }

      return {
        ...state,
        currentFileNo: nextDocumentNo,
        currentDocument: state.documents[nextDocumentNo],
        documentLoading: true,
      };
    }

    case PREVIOUS_DOCUMENT: {
      if (state.currentFileNo <= 0) return state;
      const prevDocumentNo = state.currentFileNo - 1;

      if (state.onDocumentChange) {
        state.onDocumentChange(state.documents[prevDocumentNo]);
      }

      return {
        ...state,
        currentFileNo: state.currentFileNo - 1,
        currentDocument: state.documents[prevDocumentNo],
        documentLoading: true,
      };
    }

    case UPDATE_CURRENT_DOCUMENT: {
      const { document } = action as UpdateCurrentDocument;
      const documents = Array.isArray(state.documents) ? state.documents : [];
      const matchedIndex = documents.findIndex(
        (doc) => doc.uri === document.uri,
      );

      return {
        ...state,
        documents,
        currentDocument: document,
        currentFileNo: matchedIndex >= 0 ? matchedIndex : state.currentFileNo,
      };
    }

    case SET_RENDERER_RECT: {
      const { rect } = action as SetRendererRect;

      return {
        ...state,
        rendererRect: rect,
      };
    }

    case SET_MAIN_CONFIG: {
      const { config } = action as SetMainConfig;

      return {
        ...state,
        config,
      };
    }

    default:
      return state;
  }
};
