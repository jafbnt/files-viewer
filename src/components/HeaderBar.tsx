import { FC, useContext } from "react";
import { DocViewerContext } from "../store/DocViewerProvider";
import { nextDocument, previousDocument } from "../store/actions";
import { DocumentNav } from "./DocumentNav";
import { FileName } from "./FileName";

export const HeaderBar: FC = () => {
  const { state, dispatch } = useContext(DocViewerContext);
  const { config } = state;

  if (config?.header?.disableHeader) return null;

  const override = config?.header?.overrideComponent?.(
    state,
    () => dispatch(previousDocument()),
    () => dispatch(nextDocument()),
  );

  if (override) {
    return override;
  }

  return (
    <div
      id="header-bar"
      data-testid="header-bar"
      className="fv:z-[1] fv:flex fv:min-h-[50px] fv:items-center fv:justify-end fv:bg-primary fv:px-2.5 fv:text-base fv:max-md:min-h-[30px] fv:max-md:p-1.5 fv:max-md:text-[10px]"
    >
      <FileName />
      <DocumentNav />
    </div>
  );
};
