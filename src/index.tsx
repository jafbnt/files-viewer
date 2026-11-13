import "./styles.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import DocViewer from "./DocViewer";

export default DocViewer;
export { DocViewerRenderers } from "./renderers";
export * from "./models";
export * from "./utils/fileLoaders";
export { type AvailableLanguages, supportedLanguages } from "./i18n";
export * from "./renderers";
export {
  FILE_TYPE_MIME_MAP,
  SUPPORTED_EXTENSIONS,
  SUPPORTED_FILE_TYPES,
  type SupportedFileType,
} from "./supportedFileTypes";
