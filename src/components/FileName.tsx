import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { getFileName } from "../utils/getFileName";

export const FileName: FC = () => {
  const {
    state: { config, currentDocument },
  } = useContext(DocViewerContext);

  if (!currentDocument || config?.header?.disableFileName) return null;

  const fileName = getFileName(
    currentDocument,
    config?.header?.retainURLParams || false,
  );

  return (
    <div
      id="file-name"
      data-testid="file-name"
      className="fv:mx-2.5 fv:flex-1 fv:overflow-hidden fv:text-left fv:font-bold fv:text-ink"
    >
      {fileName}
    </div>
  );
};
