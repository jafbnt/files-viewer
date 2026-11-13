import React, { FC, useContext } from "react";
import { Button } from "../../../components/common";
import { PDFContext } from "../state";
import { setCurrentPage } from "../state/actions";
import { NextPDFNavIcon, PrevPDFNavIcon } from "./icons";
import { useTranslation } from "../../../hooks/useTranslation";

const PDFPagination: FC = () => {
  const {
    state: { currentPage, numPages },
    dispatch,
  } = useContext(PDFContext);
  const { t } = useTranslation();

  return (
    <div id="pdf-pagination" className="fv:flex fv:items-center">
      <Button
        id="pdf-pagination-prev"
        className="fv:mx-1.5 fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <PrevPDFNavIcon color="#000" size="50%" />
      </Button>

      <div
        id="pdf-pagination-info"
        className="fv:text-left fv:text-sm fv:text-ink fv:max-md:text-[10px]"
      >
        {t("pdfPluginPageNumber", {
          currentPage,
          allPagesCount: numPages,
        })}
      </div>

      <Button
        id="pdf-pagination-next"
        className="fv:mr-5 fv:ml-1.5 fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage >= numPages}
      >
        <NextPDFNavIcon color="#000" size="50%" />
      </Button>
    </div>
  );
};

export default PDFPagination;
