import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { nextDocument, previousDocument } from "../store/actions";
import { useTranslation } from "../hooks/useTranslation";
import { ButtonSecondary } from "./common/Button";
import { NextDocIcon, PrevDocIcon } from "./icons";

export const DocumentNav: FC = () => {
  const {
    state: { currentDocument, currentFileNo, documents, config },
    dispatch,
  } = useContext(DocViewerContext);
  const { t } = useTranslation();

  if (
    documents.length <= 1 ||
    !currentDocument ||
    config?.header?.disableDocumentNav
  ) {
    return null;
  }

  return (
    <div
      id="doc-nav"
      className="fv:mx-2.5 fv:flex fv:min-w-[150px] fv:flex-row fv:items-center fv:justify-end fv:text-ink"
    >
      <p id="doc-nav-info">
        {t("documentNavInfo", {
          currentFileNo: currentFileNo + 1,
          allFilesCount: documents.length,
        })}
      </p>

      <ButtonSecondary
        id="doc-nav-prev"
        className="fv:ml-2.5 fv:mr-1.5 fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]"
        onClick={() => dispatch(previousDocument())}
        disabled={currentFileNo === 0}
      >
        <PrevDocIcon color="#fff" size="60%" />
      </ButtonSecondary>

      <ButtonSecondary
        id="doc-nav-next"
        className="fv:mx-1.5 fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]"
        onClick={() => dispatch(nextDocument())}
        disabled={currentFileNo >= documents.length - 1}
      >
        <NextDocIcon color="#fff" size="60%" />
      </ButtonSecondary>
    </div>
  );
};
