import type { CSSProperties } from "react";
import { defaultTheme } from "../defaultTheme";
import type { ITheme } from "../models";

export type ResolvedTheme = {
  primary: string;
  secondary: string;
  tertiary: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  disableThemeScrollbar: boolean;
};

export const resolveTheme = (theme?: ITheme): ResolvedTheme => ({
  primary: theme?.primary ?? defaultTheme.primary!,
  secondary: theme?.secondary ?? defaultTheme.secondary!,
  tertiary: theme?.tertiary ?? defaultTheme.tertiary!,
  textPrimary: theme?.textPrimary ?? defaultTheme.textPrimary!,
  textSecondary: theme?.textSecondary ?? defaultTheme.textSecondary!,
  textTertiary: theme?.textTertiary ?? defaultTheme.textTertiary!,
  disableThemeScrollbar:
    theme?.disableThemeScrollbar ?? defaultTheme.disableThemeScrollbar ?? false,
});

export const themeToCssVars = (theme?: ITheme): CSSProperties => {
  const resolved = resolveTheme(theme);

  return {
    ["--fv-primary" as string]: resolved.primary,
    ["--fv-secondary" as string]: resolved.secondary,
    ["--fv-tertiary" as string]: resolved.tertiary,
    ["--fv-text-primary" as string]: resolved.textPrimary,
    ["--fv-text-secondary" as string]: resolved.textSecondary,
    ["--fv-text-tertiary" as string]: resolved.textTertiary,
  };
};
