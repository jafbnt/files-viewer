import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";

export const LoadingTimeout: FC<PropsWithChildren> = ({ children }) => {
  const { state } = useContext(DocViewerContext);
  const { config } = state;
  const showLoadingTimeout = config?.loadingRenderer?.showLoadingTimeout;
  const [shouldLoadingRender, setShouldLoadingRender] = useState(
    showLoadingTimeout === false,
  );

  useEffect(() => {
    if (showLoadingTimeout === false) {
      setShouldLoadingRender(true);
      return;
    }

    const timer = setTimeout(
      () => {
        setShouldLoadingRender(true);
      },
      typeof showLoadingTimeout === "number" ? showLoadingTimeout : 500,
    );

    return () => {
      clearTimeout(timer);
    };
  }, [showLoadingTimeout]);

  if (!shouldLoadingRender) {
    return null;
  }

  return <>{children}</>;
};
