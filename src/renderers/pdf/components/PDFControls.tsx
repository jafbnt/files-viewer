import React, { FC, useContext } from "react";
import { Button, LinkButton } from "../../../components/common";
import { PDFContext } from "../state";
import { setPDFPaginated, setZoomLevel } from "../state/actions";
import { useTranslation } from "../../../hooks/useTranslation";
import {
  DownloadPDFIcon,
  ResetZoomPDFIcon,
  TogglePaginationPDFIcon,
  ZoomInPDFIcon,
  ZoomOutPDFIcon,
} from "./icons";
import PDFPagination from "./PDFPagination";

const controlSize =
  "fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]";

const PDFControls: FC = () => {
  const { t } = useTranslation();
  const {
    state: {
      mainState,
      paginated,
      zoomLevel,
      numPages,
      zoomJump,
      defaultZoomLevel,
    },
    dispatch,
  } = useContext(PDFContext);

  const currentDocument = mainState?.currentDocument || null;
  const controls = mainState?.config?.pdfControls;

  if (controls?.disable) return null;

  const showPagination = !controls?.disablePagination && paginated && numPages > 1;
  const showDownload = !controls?.disableDownload && Boolean(currentDocument?.fileData);
  const showZoomOut = !controls?.disableZoomOut;
  const showZoomIn = !controls?.disableZoomIn;
  const showZoomReset = !controls?.disableZoomReset;
  const showTogglePagination =
    !controls?.disableTogglePagination && numPages > 1;

  if (
    !showPagination &&
    !showDownload &&
    !showZoomOut &&
    !showZoomIn &&
    !showZoomReset &&
    !showTogglePagination
  ) {
    return null;
  }

  return (
    <div
      id="pdf-controls"
      className="fv:sticky fv:top-0 fv:left-0 fv:z-[1] fv:flex fv:justify-end fv:bg-tertiary fv:p-2 fv:shadow-[0_2px_3px_#00000033] fv:max-md:p-1.5"
    >
      {showPagination && <PDFPagination />}

      {showDownload && (
        <LinkButton
          id="pdf-download"
          className={controlSize}
          href={currentDocument?.fileData as string}
          download={currentDocument?.fileName || currentDocument?.uri}
          title={t("downloadButtonLabel")}
        >
          <DownloadPDFIcon color="#000" size="75%" />
        </LinkButton>
      )}

      {showZoomOut && (
        <Button
          id="pdf-zoom-out"
          className={controlSize}
          onMouseDown={() => dispatch(setZoomLevel(zoomLevel - zoomJump))}
        >
          <ZoomOutPDFIcon color="#000" size="80%" />
        </Button>
      )}

      {showZoomIn && (
        <Button
          id="pdf-zoom-in"
          className={controlSize}
          onMouseDown={() => dispatch(setZoomLevel(zoomLevel + zoomJump))}
        >
          <ZoomInPDFIcon color="#000" size="80%" />
        </Button>
      )}

      {showZoomReset && (
        <Button
          id="pdf-zoom-reset"
          className={controlSize}
          onMouseDown={() => dispatch(setZoomLevel(defaultZoomLevel))}
          disabled={zoomLevel === defaultZoomLevel}
        >
          <ResetZoomPDFIcon color="#000" size="70%" />
        </Button>
      )}

      {showTogglePagination && (
        <Button
          id="pdf-toggle-pagination"
          className={controlSize}
          onMouseDown={() => dispatch(setPDFPaginated(!paginated))}
        >
          <TogglePaginationPDFIcon
            color="#000"
            size="70%"
            reverse={paginated}
          />
        </Button>
      )}
    </div>
  );
};

export default PDFControls;
