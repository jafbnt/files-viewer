import React, { FC, useContext } from "react";
import { Page } from "react-pdf";
import { useTranslation } from "../../../../hooks/useTranslation";
import { cn } from "../../../../utils/cn";
import { PDFContext } from "../../state";

interface Props {
  pageNum?: number;
}

const PDFSinglePage: FC<Props> = ({ pageNum }) => {
  const {
    state: { mainState, paginated, zoomLevel, numPages, currentPage },
  } = useContext(PDFContext);
  const { t } = useTranslation();

  const rendererRect = mainState?.rendererRect || null;
  const _pageNum = pageNum ?? currentPage;
  const lastPage = _pageNum >= numPages;

  return (
    <div
      id="pdf-page-wrapper"
      className={cn(lastPage && "fv:my-5")}
    >
      {!paginated && (
        <div
          id="pdf-page-info"
          className="fv:pb-2.5 fv:pl-2.5 fv:text-left fv:text-sm fv:text-ink-muted fv:max-md:text-[10px]"
        >
          {t("pdfPluginPageNumber", {
            currentPage: _pageNum,
            allPagesCount: numPages,
          })}
        </div>
      )}
      <Page
        pageNumber={_pageNum || currentPage}
        scale={zoomLevel}
        height={(rendererRect?.height ?? 100) - 100}
        width={(rendererRect?.width ?? 100) - 100}
        loading={t("pdfPluginLoading")}
      />
    </div>
  );
};

export default PDFSinglePage;
