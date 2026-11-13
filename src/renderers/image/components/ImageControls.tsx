import React, { FC, useContext } from "react";
import { Button, LinkButton } from "../../../components/common";
import { useTranslation } from "../../../hooks/useTranslation";
import { DocViewerContext } from "../../../store/DocViewerProvider";
import { ImageContext } from "../state";
import { setImageRotation, setImageZoomLevel } from "../state/actions";
import {
  DownloadImageIcon,
  ResetZoomImageIcon,
  RotateLeftImageIcon,
  RotateRightImageIcon,
  ZoomInImageIcon,
  ZoomOutImageIcon,
} from "./icons";

const controlSize =
  "fv:h-[30px] fv:w-[30px] fv:max-md:h-[25px] fv:max-md:w-[25px]";

const ImageControls: FC = () => {
  const { t } = useTranslation();
  const {
    state: { config, currentDocument },
  } = useContext(DocViewerContext);
  const {
    state: { zoomLevel, zoomJump, defaultZoomLevel, rotation },
    dispatch,
  } = useContext(ImageContext);

  const controls = config?.imageControls;
  if (controls?.disable) return null;

  const showDownload =
    !controls?.disableDownload && typeof currentDocument?.fileData === "string";
  const showZoomOut = !controls?.disableZoomOut;
  const showZoomIn = !controls?.disableZoomIn;
  const showZoomReset = !controls?.disableZoomReset;
  const showRotateLeft = !controls?.disableRotateLeft;
  const showRotateRight = !controls?.disableRotateRight;
  const showRotateReset = !controls?.disableRotateReset;

  if (
    !showDownload &&
    !showZoomOut &&
    !showZoomIn &&
    !showZoomReset &&
    !showRotateLeft &&
    !showRotateRight &&
    !showRotateReset
  ) {
    return null;
  }

  return (
    <div
      id="image-controls"
      className="fv:sticky fv:top-0 fv:left-0 fv:z-[1] fv:flex fv:justify-end fv:bg-tertiary fv:p-2 fv:shadow-[0_2px_3px_#00000033] fv:max-md:p-1.5"
    >
      {showDownload && (
        <LinkButton
          id="image-download"
          className={controlSize}
          href={currentDocument?.fileData as string}
          download={currentDocument?.fileName || currentDocument?.uri}
          title={t("downloadButtonLabel")}
        >
          <DownloadImageIcon color="#000" size="75%" />
        </LinkButton>
      )}

      {showZoomOut && (
        <Button
          id="image-zoom-out"
          className={controlSize}
          onMouseDown={() => dispatch(setImageZoomLevel(zoomLevel - zoomJump))}
        >
          <ZoomOutImageIcon color="#000" size="80%" />
        </Button>
      )}

      {showZoomIn && (
        <Button
          id="image-zoom-in"
          className={controlSize}
          onMouseDown={() => dispatch(setImageZoomLevel(zoomLevel + zoomJump))}
        >
          <ZoomInImageIcon color="#000" size="80%" />
        </Button>
      )}

      {showZoomReset && (
        <Button
          id="image-zoom-reset"
          className={controlSize}
          onMouseDown={() => dispatch(setImageZoomLevel(defaultZoomLevel))}
          disabled={zoomLevel === defaultZoomLevel}
        >
          <ResetZoomImageIcon color="#000" size="70%" />
        </Button>
      )}

      {showRotateLeft && (
        <Button
          id="image-rotate-left"
          className={controlSize}
          onMouseDown={() => dispatch(setImageRotation(rotation - 90))}
          title={t("imageRotateLeftLabel")}
        >
          <RotateLeftImageIcon color="#000" size="75%" />
        </Button>
      )}

      {showRotateRight && (
        <Button
          id="image-rotate-right"
          className={controlSize}
          onMouseDown={() => dispatch(setImageRotation(rotation + 90))}
          title={t("imageRotateRightLabel")}
        >
          <RotateRightImageIcon color="#000" size="75%" />
        </Button>
      )}

      {showRotateReset && (
        <Button
          id="image-rotate-reset"
          className={controlSize}
          onMouseDown={() => dispatch(setImageRotation(0))}
          disabled={rotation === 0}
          title={t("imageRotateResetLabel")}
        >
          <span className="fv:text-[10px] fv:font-semibold fv:text-black">
            0°
          </span>
        </Button>
      )}
    </div>
  );
};

export default ImageControls;
