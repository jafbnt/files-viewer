import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

const baseBtn =
  "fv:inline-flex fv:items-center fv:justify-center fv:m-0 fv:border-0 fv:outline-none fv:cursor-pointer fv:no-underline fv:rounded-full fv:shadow-[2px_2px_3px_#00000033] fv:p-0 fv:w-[35px] fv:h-[35px] fv:text-[18px] fv:max-md:w-[30px] fv:max-md:h-[30px] fv:max-md:text-[15px]";

const primaryBtn = "fv:bg-primary fv:text-ink";
const secondaryBtn = "fv:bg-secondary fv:text-ink-inv";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button = ({
  className,
  disabled,
  variant = "primary",
  ...props
}: BtnProps) => (
  <button
    type="button"
    disabled={disabled}
    className={cn(
      baseBtn,
      variant === "secondary" ? secondaryBtn : primaryBtn,
      "fv:ml-[5px]",
      disabled && "fv:opacity-40 fv:pointer-events-none",
      className,
    )}
    {...props}
  />
);

export const ButtonPrimary = (props: BtnProps) => (
  <Button variant="primary" {...props} />
);

export const ButtonSecondary = (props: BtnProps) => (
  <Button variant="secondary" {...props} />
);

export const LinkButton = ({
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn(baseBtn, primaryBtn, className)}
    {...props}
  />
);
