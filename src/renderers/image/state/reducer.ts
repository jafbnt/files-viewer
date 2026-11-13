import {
  ImageActions,
  RESET_IMAGE_VIEW,
  SET_IMAGE_ROTATION,
  SET_IMAGE_ZOOM_LEVEL,
  SetImageRotation,
  SetImageZoomLevel,
} from "./actions";

export type IImageState = {
  defaultZoomLevel: number;
  zoomLevel: number;
  zoomJump: number;
  rotation: number;
};

export const initialImageState: IImageState = {
  defaultZoomLevel: 1,
  zoomLevel: 1,
  zoomJump: 0.2,
  rotation: 0,
};

const MIN_ZOOM = 0.1;

export const reducer = (
  state: IImageState = initialImageState,
  action: ImageActions,
): IImageState => {
  switch (action.type) {
    case SET_IMAGE_ZOOM_LEVEL: {
      const { value } = action as SetImageZoomLevel;
      return { ...state, zoomLevel: Math.max(value, MIN_ZOOM) };
    }
    case SET_IMAGE_ROTATION: {
      const { value } = action as SetImageRotation;
      return { ...state, rotation: ((value % 360) + 360) % 360 };
    }
    case RESET_IMAGE_VIEW:
      return {
        ...state,
        zoomLevel: state.defaultZoomLevel,
        rotation: 0,
      };
    default:
      return state;
  }
};
