export const SET_IMAGE_ZOOM_LEVEL = "SET_IMAGE_ZOOM_LEVEL";
export const SET_IMAGE_ROTATION = "SET_IMAGE_ROTATION";
export const RESET_IMAGE_VIEW = "RESET_IMAGE_VIEW";

export interface SetImageZoomLevel {
  type: typeof SET_IMAGE_ZOOM_LEVEL;
  value: number;
}

export interface SetImageRotation {
  type: typeof SET_IMAGE_ROTATION;
  value: number;
}

export interface ResetImageView {
  type: typeof RESET_IMAGE_VIEW;
}

export const setImageZoomLevel = (value: number): SetImageZoomLevel => ({
  type: SET_IMAGE_ZOOM_LEVEL,
  value,
});

export const setImageRotation = (value: number): SetImageRotation => ({
  type: SET_IMAGE_ROTATION,
  value,
});

export const resetImageView = (): ResetImageView => ({
  type: RESET_IMAGE_VIEW,
});

export type ImageActions =
  | SetImageZoomLevel
  | SetImageRotation
  | ResetImageView;
